# teste para poder colocar os dados e importar o modelo através do buckete
import pickle
import numpy as np

# Carregar o modelo .pkl
with open("/tmp/modelo.pkl", "rb") as f: # modelo para poder fazer a predição por que eu estou importando o modelo dentro do buckete
    model = pickle.load(f)

# Substitua X_novos_dados pelo seu dataset real com 37 características
# Aqui, estou criando dados fictícios com 37 características para demonstrar
X_novos_dados = np.random.rand(3, 37)  # 3 amostras, 37 características

# Fazer previsões
predicoes = model.predict(X_novos_dados)

# Mostrar as previsões
print("Previsões do modelo:", predicoes)