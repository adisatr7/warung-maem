# Warung Maem

## Cara Download

**Perhatian:** Instruksi di bawah ini mengambil asumsi bahwa Anda menggunakan sistem operasi Windows di perangkat komputer Anda.

1. Buka folder yang Anda ingin jadikan folder project melalui Terminal. Misalnya:

```cmd
cd C:\Users\<user>\Documents\Projects\
```

2. Clone repository ini menggunakan perintah git. Pastikan Anda telah menginstall [Git](https://git-scm.com/downloads) terlebih dahulu

```bash
git clone https://github.com/adisatr7/warung-maem.git
```

3. Setelah proses cloning selesai, arahkah Terminal ke folder **backend**.

```cmd
cd backend
```

4. Install library-library Python yang digunakan di project ini.

```powershell
pip install -r requirements.txt
```

5. Masih di folder **backend**, buat file baru bernama `env.py`. Tuliskan konfigurasi berikut di dalam file tersebut (Pastikan isi sesuai dengan alamat localhost di sistem Anda):

```python
LOCALHOST_URL = "http://127.0.0.1:5000"
DATABASE_URL = "localhost:3306/warung_maem"
DATABASE_USER = ""    # Default: "root"
```

6. Arahkan Terminal anda ke folder **frontend** dengan keluar dari folder **backend** terlebih dahulu.

```cmd
cd..
cd frontend
```

7. Install library-library JavaScript yang digunakan oleh project ini.

```cmd
npm install
```

8. Buat file baru bername `env.ts`, lalu isi file tersebut dengan konfigurasi sesuai sistem Anda. Misalnya:

```ts
export const API_URL = "http://127.0.0.1:5000/"
```

## Cara Running

1. Buka terminal dan arahkan ke dalam folder **frontend**.

```cmd
cd frontend
```

2. Jalankan perintah berikut:

```cmd
npm start
```
