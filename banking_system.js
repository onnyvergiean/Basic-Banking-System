class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  showBalance(balance) {
    document.getElementById('saldo').textContent = `Rp ${balance}`;
  }

  showMessage(message) {
    document.getElementById('pesan').textContent = message;
  }

  deposit() {
    let depositAmount = parseFloat(
      prompt('Masukkan jumlah saldo yang ingin ditambah: ')
    );
    try {
      if (isNaN(depositAmount) || depositAmount <= 0) {
        throw new Error(
          'Jumlah yang dimasukkan tidak valid atau kurang dari atau sama dengan 0.'
        );
      }
      setTimeout(() => {
        this.balance += depositAmount;
        this.showBalance(this.balance);
        this.showMessage(
          `Saldo berhasil ditambahkan sebesar Rp ${depositAmount}.`
        );
      }, 1000);
      return;
    } catch (err) {
      this.showMessage(err.message);
    }
  }

  withdraw() {
    let withdrawAmount = parseFloat(
      prompt('Masukkan jumlah saldo yang ingin dikurangi: ')
    );
    try {
      if (isNaN(withdrawAmount) || withdrawAmount <= 0)
        throw new Error(
          'Jumlah yang dimasukkan tidak valid atau kurang dari atau sama dengan 0.'
        );

      if (withdrawAmount > this.balance) {
        throw new Error('Saldo tidak mencukupi.');
      }

      setTimeout(() => {
        this.balance -= withdrawAmount;
        this.showBalance(this.balance);
        this.showMessage(
          `Saldo berhasil dikurangi sebesar Rp ${withdrawAmount}.`
        );
      }, 1000);
    } catch (err) {
      this.showMessage(err.message);
    }
  }
}

const bank = new BankAccount(1000000);
