AOS.init();

const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#ham-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar jika ingin keluar
const ham = document.querySelector("#ham-menu");

document.addEventListener("click", function (e) {
  if (!ham.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// -----------------------------------------------------------------------

// Ambil referensi elemen ul untuk daftar produk
const productList = document.getElementById("list-produk");

// Lakukan permintaan HTTP GET untuk mengambil data dari data.json
fetch("produk.json")
  .then((response) => response.json())
  .then((data) => {
    // Dapatkan array produk dari data JSON
    const products = data.produk;

    // Buat string HTML untuk daftar produk
    let productHTML = "";

    // Loop melalui setiap produk dan tambahkan ke string HTML
    products.forEach((produk) => {
      productHTML += `
      <div class="produk">
      <img src=${produk.img} alt=${produk.title} />
      <h3>${produk.title}</h3>
      <span>${produk.price}</span>
      <button class="lihat-btn" onclick=sweet(${produk.id})>Lihat</button>
    </div>`;
    });

    // Isi elemen ul dengan string HTML yang berisi daftar produk
    productList.innerHTML = productHTML;
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
  
  // ----------------------------------------------------------------------------------------------------

  let isLoggedIn = false; // Tambahkan variabel status login

  // ...
  
  // Halaman login
  
  document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form untuk melakukan submit default
  
    // Mengambil nilai dari input username dan password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Memeriksa apakah username dan password yang dimasukkan sesuai
    if (username === "admin" && password === "123") {
      isLoggedIn = true; // Setelah login berhasil, ubah status menjadi true
  
      // Tampilkan pesan pop-up SweetAlert untuk login berhasil
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Lakukan tindakan yang sesuai setelah login berhasil
        // Contoh: redirect ke halaman lain, tampilkan pesan sukses, dll.
      });
    } else {
      // Tampilkan pesan pop-up SweetAlert untuk login gagal
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Silakan coba lagi',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
    }
  });
  
  // Fungsi sweet dengan perubahan untuk memeriksa status login sebelum melakukan bid
  function sweet(id) {
    if (!isLoggedIn) { // Periksa status login sebelum menampilkan SweetAlert bid
      Swal.fire({
        icon: 'info',
        title: 'Anda harus login dahulu',
        text: 'Silakan login untuk melakukan bid',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      return; // Hentikan eksekusi jika belum login
    }
  
    // Jika sudah login, lanjutkan dengan proses bid
    fetch("produk.json")
      .then((response) => response.json())
      .then((data) => {
        const products = data.produk;
        const result = products.filter((datas) => datas.id == id);
  
        // Menyimpan data dari hasil fetch
        const productData = result[0];
  
        // Menampilkan pop-up SweetAlert dengan informasi produk dan input untuk menambah bid
        Swal.fire({
          title: productData.title,
          html: `
            <img src="${productData.img}" style="max-width: 100%; height: auto;" alt="${productData.title}">
            <p>Open Bid: ${productData.price}</p>
            <p>bid tertinggi: ${productData.tinggi}</p>
            <p>bid tertinggi sementara: ${productData.bts}</p>
            <p>Waktu: ${productData.waktu}</p>
            <input type="number" id="bidAmount" placeholder="Masukkan jumlah bid" style="width: 200px; height: 30px;">
          `,
          showCancelButton: true,
          confirmButtonText: 'Bid',
          cancelButtonText: 'Close',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const bidAmount = document.getElementById('bidAmount').value;
            
            // Lakukan validasi jika bidAmount sesuai kebutuhan
            if (bidAmount.trim() === '') {
              Swal.showValidationMessage('Bid tidak boleh kosong');
            } else {
              const bidValue = parseFloat(bidAmount);
              const btsValue = parseFloat(productData.bts);
            
              // Periksa apakah bid lebih besar atau sama dengan bts
              if (bidValue <= btsValue) {
                Swal.showValidationMessage('Bid harus lebih besar dari bid tertinggi sementara');
              } else {
                // Lakukan proses pengiriman bid, misalnya melalui fetch ke backend atau pemrosesan lainnya
                return new Promise((resolve) => {
                  // Misalnya, menampilkan pesan bahwa bid berhasil
                  setTimeout(() => {
                    resolve();
                  }, 2000); // Contoh simulasi proses bid selama 2 detik
                });
              }
            }
          },          
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Lakukan sesuatu jika bid telah berhasil dikirim
            Swal.fire('Bid berhasil!', '', 'success');
          }
        });
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  }
  







 





