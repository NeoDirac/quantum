import numpy as np
from scipy.linalg import eigh
from .potential import BOHR_TO_ANGSTROM, HARTREE_TO_EV


class TISEResult:
    def __init__(self, x_au, v_au, energies_au, wavefunctions_au, mode=''):
        # Datos en unidades atómicas
        self.x_bohr = x_au
        self.v_hartree = v_au
        self.energies_hartree = energies_au
        self.wavefunctions_bohr = wavefunctions_au
        self.mode = mode

        # Conversión a unidades físicas para reporte y gráfica
        self.x_angstrom = x_au * BOHR_TO_ANGSTROM
        self.v_eV = v_au * HARTREE_TO_EV
        self.energies_eV = energies_au * HARTREE_TO_EV
        self.wavefunctions_angstrom = wavefunctions_au / np.sqrt(BOHR_TO_ANGSTROM)

        self.h_bohr = x_au[1] - x_au[0] if len(x_au) > 1 else 1.0
        self.L_bohr = len(x_au) * self.h_bohr
        self.h_angstrom = self.h_bohr * BOHR_TO_ANGSTROM
        self.L_angstrom = self.L_bohr * BOHR_TO_ANGSTROM
        self.num_states = len(energies_au)


class TISESolver:
    def __init__(self, potential, mode='non-periodic'):
        if mode not in ('periodic', 'non-periodic'):
            raise ValueError("mode debe ser 'periodic' o 'non-periodic'.")
        self.potential = potential
        self.mode = mode

    def build_hamiltonian(self):
        v = self.potential.v
        h = self.potential.h
        N = len(v)

        # Construcción tridiagonal por diferencias finitas
        diag = 1.0 / (h**2) + v
        off_diag = -0.5 / (h**2) * np.ones(N - 1)

        H = np.diag(diag) + np.diag(off_diag, k=1) + np.diag(off_diag, k=-1)

        # Acoplamiento de esquinas para celda periódica
        if self.mode == 'periodic':
            corner_val = -0.5 / (h**2)
            H[0, N - 1] = corner_val
            H[N - 1, 0] = corner_val

        return H

    def solve(self, num_states=10):
        n_points = len(self.potential.x)
        if not (1 <= num_states <= n_points):
            raise ValueError(f"num_states fuera de rango: {num_states}")

        H = self.build_hamiltonian()

        # Diagonalización de matriz simétrica
        energies, wavefunctions = eigh(H, subset_by_index=[0, num_states - 1])

        # Normalización discreta: sum(|psi|^2) * h = 1
        h = self.potential.h
        for n in range(num_states):
            norm = np.sum(np.abs(wavefunctions[:, n]) ** 2) * h
            wavefunctions[:, n] = wavefunctions[:, n] / np.sqrt(norm)

        return TISEResult(
            x_au=self.potential.x.copy(),
            v_au=self.potential.v.copy(),
            energies_au=energies,
            wavefunctions_au=wavefunctions,
            mode=self.mode
        )
