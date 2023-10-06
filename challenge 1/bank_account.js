let saldo = 1000000;

const tampilkanSaldo = (saldo) => {
  document.getElementById('saldo').textContent = `Rp ${saldo}`;
};

const tampilkanPesan = (pesan) => {
  document.getElementById('pesan').textContent = pesan;
};

const tambahSaldo = () => {
  let kredit = parseFloat(
    prompt('Masukkan jumlah saldo yang ingin ditambah: ')
  );
  if (!isNaN(kredit) && kredit > 0) {
    saldo += kredit;
    tampilkanSaldo(saldo);
    tampilkanPesan(`Saldo berhasil ditambahkan sebesar ${kredit}`);
    return;
  }
  tampilkanPesan('Saldo gagal ditambahkan!');
};

const kurangiSaldo = () => {
  let debit = parseFloat(
    prompt('Masukkan jumlah saldo yang ingin dikurangi: ')
  );
  if (isNaN(debit) || debit <= 0) {
    tampilkanPesan(
      'Jumlah yang dimasukkan tidak valid atau kurang dari atau sama dengan 0.'
    );
    return;
  }

  if (debit <= saldo) {
    saldo -= debit;
    tampilkanSaldo(saldo);
    tampilkanPesan(`Saldo berhasil dikurangi sebesar ${debit}`);
  } else {
    tampilkanPesan('Saldo tidak mencukupi.');
  }
};
