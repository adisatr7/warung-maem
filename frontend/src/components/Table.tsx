
export default function Table() {
    return (
    <div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
     <h1 className = "p-[30px] mt-5 mb-5 font-bold text-3xl">
        Data User
     </h1>
        <div className = "justify-center flex">
        <table className = {BorderStyle}>
        <thead>
                <tr>
                    <th>Nama</th>
                    <th>No Telp</th>
                    <th>Alamat</th>
                    <th>Password</th>
                </tr>
            </thead>
                <tr>
                    <th>Ahmad</th>
                    <th>081234567890</th>
                    <th>Jl. Merdeka No.10</th>
                    <th>password123</th>
                </tr>
            <tbody>
                <tr>
                    <td>Joko</td>
                    <td>090123456789</td>
                    <td>Jl. Imam Bonjol No. 40</td>
                    <td>pass9876</td>
                </tr>
                <tr>
                    <td>Budi</td>
                    <td>082345678901</td>
                    <td>Jl. Sudirman No. 25</td>
                    <td>qwerty789</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    )
}

const BorderStyle = "border border-black"