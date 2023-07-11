# Import library yang dibutuhkan
from sqlalchemy import Engine, create_engine
from sqlalchemy.orm import sessionmaker
from api.models import Base
from backend.env import DATABASE_URL, DATABASE_USER


# Inisiasi Database Engine
print("Connecting to database...")
engine: Engine | None = None

# Mencoba membuat koneksi ke database
try:
    engine = create_engine(F"mysql+pymysql://{DATABASE_USER}@{DATABASE_URL}", echo=True)
    Base.metadata.create_all(engine)

    # Jika berhasil, maka akan mencetak "Connected to database!"
    print("Connected to database!")

# Jika gagal, maka akan mencetak error message
except Exception as error:
    print(f"Failed to connect to database. Error message: {error}")

# Mencoba membuat session database
try:
    print("Creating database session...")
    Session = sessionmaker(bind=engine)
    session = Session()

    # Jika gagal, maka akan mencetak error message
    print("Database session created!")

# Jika gagal, maka akan mencetak error message
except Exception as error:
    print(f"Failed to create session. Error message: {error}")
