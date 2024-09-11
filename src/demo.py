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


from minio import Minio
from minio.error import S3Error

# Conectar ao MinIO
client = Minio(
    "localhost:9000",  # URL do MinIO (pode ser localhost se você estiver rodando localmente)
    access_key="ROOTNAME",  # Chave de acesso definida no seu docker-compose.yml
    secret_key="CHANGEME123",  # Senha definida no seu docker-compose.yml
    secure=False  # False se você não estiver usando HTTPS
)

# Listar todos os itens do bucket 'modelos'
try:
    objects = client.list_objects("modelos")
    for obj in objects:
        print(f"Item: {obj.object_name}")
except S3Error as err:
    print(f"Erro: {err}")
