import pickle
import numpy as np
from scipy.interpolate import CubicSpline

# Factores de conversión a unidades atómicas (Bohr y Hartree)
BOHR_TO_ANGSTROM = 0.52917721092
HARTREE_TO_EV = 27.211386245988


class Potential:
    def __init__(self, x_grid, v_values, unit_x='Angstrom', unit_v='eV'):
        x_grid = np.asarray(x_grid, dtype=float)
        v_values = np.asarray(v_values, dtype=float)

        if x_grid.ndim != 1 or v_values.ndim != 1:
            raise ValueError("x_grid y v_values deben ser arreglos 1D.")
        if len(x_grid) != len(v_values):
            raise ValueError("x_grid y v_values deben tener la misma longitud.")

        self.unit_x = unit_x
        self.unit_v = unit_v

        # Conversión interna a unidades atómicas
        if unit_x == 'Angstrom':
            self.x = x_grid / BOHR_TO_ANGSTROM
        elif unit_x == 'Bohr':
            self.x = x_grid.copy()
        else:
            raise ValueError("Unidad de x no válida.")

        if unit_v == 'eV':
            self.v = v_values / HARTREE_TO_EV
        elif unit_v == 'Hartree':
            self.v = v_values.copy()
        else:
            raise ValueError("Unidad de V no válida.")

        # Paso de malla y longitud de celda en unidades atómicas
        self.h = self.x[1] - self.x[0] if len(self.x) > 1 else 1.0
        self.L = len(self.x) * self.h

    def interpolate(self, new_h, new_L=None):
        # Re-muestreo a malla fina usando spline cúbico
        if self.unit_x == 'Angstrom':
            new_h_au = new_h / BOHR_TO_ANGSTROM
            new_L_au = None if new_L is None else new_L / BOHR_TO_ANGSTROM
        else:
            new_h_au = new_h
            new_L_au = new_L

        L_target = self.L if new_L_au is None else new_L_au
        n_points = int(round(L_target / new_h_au))

        x_new = self.x[0] + new_h_au * np.arange(n_points)
        cs = CubicSpline(self.x, self.v)
        v_new = cs(x_new)

        return Potential(x_new, v_new, unit_x='Bohr', unit_v='Hartree')

class PicklePotentialLoader:
    @classmethod
    def load(cls, file_path, unit_x='Angstrom', unit_v='eV'):
        with open(file_path, 'rb') as handle:
            data = pickle.load(handle)
        if isinstance(data, dict):      
            data = [data['h'], data['V']]

        h = float(data[0])
        v_values = np.asarray(data[1], dtype=float)

        # La malla empieza en 0 y L = N*h
        n_points = len(v_values)
        x_grid = h * np.arange(n_points)

        return Potential(x_grid, v_values, unit_x=unit_x, unit_v=unit_v)