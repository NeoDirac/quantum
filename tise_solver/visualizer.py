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

        # Ventana vertical que cubre la gráfica
        y_low = min(v.min(), energies[0])
        y_high = energies[n_plot - 1]
        y_span = max(y_high - y_low, 1e-12)

        # Escalado: la autofunción más alta ocupa ~25% de la ventana
        max_psi = np.max(np.abs(wavefunctions[:, :n_plot]))
        psi_scale = 0.25 * y_span / max_psi * scale

  
        colors = plt.cm.tab10.colors

        
        ax.plot(x, v, color='black', linewidth=1.8, label='V(x)')

        for n in range(n_plot):
            color = colors[n % 10]
            E_n = energies[n]
            psi_n = wavefunctions[:, n]

            # Nivel de energía con el color de su estado
            ax.hlines(E_n, x[0], x[-1], colors=color,
                      linestyles='dashed', alpha=0.5)

            # Función de onda desplazada sobre su nivel
            ax.plot(x, E_n + psi_scale * psi_n, color=color, linewidth=1.4,
                    label=f'n={n}: E = {E_n:.3f} eV')

        ax.set_xlabel('x (Å)')
        ax.set_ylabel('Energía (eV)')
        ax.set_title(f'Soluciones TISE 1D (Modo: {result.mode})')

        # Margen vertical para que no se corte ninguna curva
        top = max(y_high + 0.3 * y_span,
                  np.max(energies[:n_plot]
                         + psi_scale * np.abs(wavefunctions[:, :n_plot]))
                  + 0.05 * y_span)
        ax.set_ylim(y_low - 0.08 * y_span, top)

        ax.grid(True, alpha=0.3)
        ax.legend(loc='upper right')
        fig.tight_layout()

        if show:
            plt.show()

        return fig, ax