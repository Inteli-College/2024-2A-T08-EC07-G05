from minio import Minio
from minio.error import S3Error
import pickle  # Para manipular arquivos .pkl
from PIL import Image  # Biblioteca para exibir a imagem
import os  # Para manipular os caminhos dos arquivos

# Conectar ao MinIO
client = Minio(
    "localhost:9000",  # URL do MinIO
    access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
    secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
    secure=False  # False se você não estiver usando HTTPS
)

# Função para baixar arquivos genéricos do MinIO, incluindo arquivos .pkl
def download_file(bucket_name, object_name, file_path):
    try:
        # Baixar o arquivo do MinIO para o caminho especificado
        client.fget_object(bucket_name, object_name, file_path)
        print(f"Arquivo {object_name} baixado com sucesso em {file_path}!")
        
        # Tratar arquivos .pkl
        if file_path.endswith('.pkl'):
            with open(file_path, 'rb') as f:
                data = pickle.load(f)
                print(f"Conteúdo do arquivo .pkl '{object_name}':")
                print(data)
        else:
            print(f"Arquivo '{object_name}' salvo, mas não é um arquivo .pkl.")
    except S3Error as err:
        print(f"Erro ao baixar o arquivo: {err}")

# Função para baixar e exibir imagens
def download_and_show_image(bucket_name, object_name, file_path):
    try:
        # Baixar o arquivo do MinIO para o caminho especificado
        client.fget_object(bucket_name, object_name, file_path)
        print(f"Arquivo {object_name} baixado com sucesso!")
        
        # Abrir e mostrar a imagem
        img = Image.open(file_path)
        img.show()
        
    except S3Error as err:
        print(f"Erro ao baixar o arquivo: {err}")

# # Exemplo de uso para baixar um arquivo .pkl
bucket_name = "modelos" # nome do buckete criado
pkl_object_name = "modelo.pkl"  # Nome do arquivo .pkl no bucket
pkl_file_path = "/tmp/modelo.pkl"  # Caminho onde o arquivo será salvo
download_file(bucket_name, pkl_object_name, pkl_file_path)

# Exemplo de uso para baixar e exibir uma imagem
img_object_name = "gengar"  # Nome do objeto (imagem) no bucket
img_file_path = "/tmp/gengar.png"  # Caminho temporário onde o arquivo será baixado
download_and_show_image(bucket_name, img_object_name, img_file_path)
