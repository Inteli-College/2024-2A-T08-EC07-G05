import pandas as pd

def convert_csv_to_parquet(csv_path, parquet_path):
    # Read the entire CSV file
    df = pd.read_csv(csv_path)

    # Write the DataFrame to a Parquet file
    df.to_parquet(parquet_path, engine='pyarrow', index=False)

if __name__ == "__main__":
    # Specify the path to your CSV file and the output Parquet file
    csv_file_path = '../data/csv/FALHAS_PREDICT-1.csv'
    parquet_file_path = 'FALHAS_PREDICT.parquet'
    
    # Convert the CSV to a Parquet file
    convert_csv_to_parquet(csv_file_path, parquet_file_path)
