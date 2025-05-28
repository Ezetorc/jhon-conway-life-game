🌱 Conceptos Básicos
Tablero: Es una rejilla bidimensional (como una matriz) de celdas.

Celdas: Cada celda tiene dos estados posibles:

Viva (1)

Muerta (0)

Vecindad: Cada celda tiene 8 vecinos (las celdas que la rodean en todas las direcciones, incluso en diagonal).

🔄 Reglas del Juego
Para cada generación (es decir, cada paso de tiempo), las reglas aplicadas a cada celda son:

Supervivencia:
Una celda viva con 2 o 3 vecinos vivos sigue viva.

Muerte por aislamiento o sobrepoblación:
Una celda viva con menos de 2 o más de 3 vecinos vivos muere.

Nacimiento:
Una celda muerta con exactamente 3 vecinos vivos cobra vida.

Estas reglas se aplican simultáneamente a todas las celdas, generando una nueva generación del tablero.
