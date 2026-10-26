import numpy as np
import matplotlib.pyplot as plt


class TISEVisualizer:
    def __init__(self, result):
        self.result = result

    def plot(self, num_states=5, scale=1.0, show=True):
        result = self.result
        x = result.x_angstrom
        v = result.v_eV
        energies = result.energies_eV
        wavefunctions = result.wavefunctions_angstrom

        n_plot = min(num_states, len(energies))
        fig, ax = plt.subplots(figsize=(9, 6))

        # Perfil del potencial V(x)
        ax.plot(x, v, color='black', linewidth=1.8, label='V(x)')

        # Ajuste de escala vertical para las funciones de onda
        y_low = min(v.min(), energies[0])
        y_high = energies[n_plot - 1]
        y_span = max(y_high - y_low, 1e-12)

        max_psi = np.max(np.abs(wavefunctions[:, :n_plot]))
        psi_scale = (0.25 * y_span / max_psi) * scale if max_psi > 0 else 1.0

        # Graficación de autoenergías y autofunciones
        for n in range(n_plot):
            E_n = energies[n]
            psi_n = wavefunctions[:, n]

            # Nivel de energía E_n
            ax.axhline(E_n, color='gray', linestyle='--', alpha=0.7)

            # Función de onda desplazada sobre su nivel de energía
            y_psi = E_n + psi_scale * psi_n
            ax.plot(x, y_psi, label=f'E_{n} = {E_n:.2f} eV')

        ax.set_xlabel('x (Å)')
        ax.set_ylabel('Energía (eV)')
        ax.set_title(f'Soluciones TISE 1D (Modo: {result.mode})')
        ax.grid(True, alpha=0.3)
        ax.legend(loc='upper right')

        if show:
            plt.show()

        return fig, ax
