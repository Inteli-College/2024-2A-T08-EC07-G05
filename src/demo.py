# from minio import Minio
# import mdf


# client = mdf.play_connect()

# # Create a bucket
# buckets = client.list_buckets()
# for bucket in buckets:
#     print("Bucket: ", bucket.name)

# import minio

# # Inicializar o cliente MinIO
# client = minio(
#     "localhost:9000",
#     access_key="ROOTNAME",
#     secret_key="CHANGEME123",
#     secure=False
# )

# # Listar objetos dentro do bucket "modelos"
# objects = client.list_objects("modelos", recursive=True)
# for obj in objects:
#     print("Objeto: ", obj.object_name)


# from minio import Minio
# from minio.error import S3Error

# # Conectar ao MinIO
# client = Minio(
#     "localhost:9000",  # URL do MinIO (pode ser localhost se você estiver rodando localmente)
#     access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
#     secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
#     secure=False  # False se você não estiver usando HTTPS
# )

# # Listar todos os itens do bucket 'modelos'
# try:
#     objects = client.list_objects("modelos")
#     for obj in objects:
#         print(f"Item: {obj.object_name}")
#         print(dir(obj))
# except S3Error as err:
#     print(f"Erro: {err}")

#########################################################

### Código para baixar arquivos genéricos do MinIO com o PKL
# from minio import Minio
# from minio.error import S3Error
# import pickle  # Para manipular arquivos .pkl

# # Conectar ao MinIO
# client = Minio(
#     "localhost:9000",  # URL do MinIO
#     access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
#     secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
#     secure=False  # False se você não estiver usando HTTPS
# )

# # Função para baixar arquivos genéricos do MinIO
# def download_file(bucket_name, object_name, file_path):
#     try:
#         # Baixar o arquivo do MinIO para o caminho especificado
#         client.fget_object(bucket_name, object_name, file_path)
#         print(f"Arquivo {object_name} baixado com sucesso em {file_path}!")
        
#         # Tratar arquivos .pkl
#         if file_path.endswith('.pkl'):
#             with open(file_path, 'rb') as f:
#                 data = pickle.load(f)
#                 print(f"Conteúdo do arquivo .pkl '{object_name}':")
#                 print(data)
#         else:
#             print(f"Arquivo '{object_name}' salvo, mas não é um arquivo .pkl.")

#     except S3Error as err:
#         print(f"Erro ao baixar o arquivo: {err}")

# # Exemplo de uso para baixar o arquivo 'modelo.pkl'
# bucket_name = "modelos"
# object_name = "modelo.pkl"  # Nome do arquivo no bucket
# file_path = "/tmp/modelo.pkl"  # Caminho onde o arquivo será salvo

# download_file(bucket_name, object_name, file_path)

#########################################################

### Código para baixar e exibir uma imagem do MinIO
# from minio import Minio
# from minio.error import S3Error
# from PIL import Image  # Biblioteca para exibir a imagem
# import io  # Para manipulação de arquivos na memória

# # Conectar ao MinIO
# client = Minio(
#     "localhost:9000",  # URL do MinIO
#     access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
#     secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
#     secure=False  # False se você não estiver usando HTTPS
# )

# # Função para baixar e exibir a imagem
# def download_and_show_image(bucket_name, object_name, file_path):
#     try:
#         # Baixar o arquivo do MinIO para o caminho especificado
#         client.fget_object(bucket_name, object_name, file_path)
#         print(f"Arquivo {object_name} baixado com sucesso!")
        
#         # Abrir e mostrar a imagem
#         img = Image.open(file_path)
#         img.show()
        
#     except S3Error as err:
#         print(f"Erro ao baixar o arquivo: {err}")

# # Listar e baixar o arquivo 'gengar'
# bucket_name = "modelos"
# object_name = "gengar"  # Nome do objeto (arquivo) no bucket
# file_path = "/tmp/gengar.png"  # Caminho temporário onde o arquivo será baixado

# download_and_show_image(bucket_name, object_name, file_path)

############################################################

# from minio import Minio
# from minio.error import S3Error
# import pickle  # Para manipular arquivos .pkl
# from PIL import Image  # Biblioteca para exibir a imagem
# import os  # Para manipular os caminhos dos arquivos

# # Conectar ao MinIO
# client = Minio(
#     "localhost:9000",  # URL do MinIO
#     access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
#     secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
#     secure=False  # False se você não estiver usando HTTPS
# )

# # Função para baixar arquivos genéricos do MinIO, incluindo arquivos .pkl
# def download_file(bucket_name, object_name, file_path):
#     try:
#         # Baixar o arquivo do MinIO para o caminho especificado
#         client.fget_object(bucket_name, object_name, file_path)
#         print(f"Arquivo {object_name} baixado com sucesso em {file_path}!")
        
#         # Tratar arquivos .pkl
#         if file_path.endswith('.pkl'):
#             with open(file_path, 'rb') as f:
#                 data = pickle.load(f)
#                 print(f"Conteúdo do arquivo .pkl '{object_name}':")
#                 print(data)
#         else:
#             print(f"Arquivo '{object_name}' salvo, mas não é um arquivo .pkl.")
#     except S3Error as err:
#         print(f"Erro ao baixar o arquivo: {err}")

# # Função para baixar e exibir imagens
# def download_and_show_image(bucket_name, object_name, file_path):
#     try:
#         # Baixar o arquivo do MinIO para o caminho especificado
#         client.fget_object(bucket_name, object_name, file_path)
#         print(f"Arquivo {object_name} baixado com sucesso!")
        
#         # Abrir e mostrar a imagem
#         img = Image.open(file_path)
#         img.show()
        
#     except S3Error as err:
#         print(f"Erro ao baixar o arquivo: {err}")

# # # Exemplo de uso para baixar um arquivo .pkl
# bucket_name = "modelos"
# pkl_object_name = "modelo.pkl"  # Nome do arquivo .pkl no bucket
# pkl_file_path = "/tmp/modelo.pkl"  # Caminho onde o arquivo será salvo
# download_file(bucket_name, pkl_object_name, pkl_file_path)

# # Exemplo de uso para baixar e exibir uma imagem
# img_object_name = "gengar"  # Nome do objeto (imagem) no bucket
# img_file_path = "/tmp/gengar.png"  # Caminho temporário onde o arquivo será baixado
# download_and_show_image(bucket_name, img_object_name, img_file_path)

import pickle
import numpy as np

# Carregar o modelo .pkl
with open("/tmp/modelo.pkl", "rb") as f:
    model = pickle.load(f)

# Substitua X_novos_dados pelo seu dataset real com 37 características
# Aqui, estou criando dados fictícios com 37 características para demonstrar
X_novos_dados = np.random.rand(3, 37)  # 3 amostras, 37 características

# Fazer previsões
predicoes = model.predict(X_novos_dados)

# Mostrar as previsões
print("Previsões do modelo:", predicoes)
