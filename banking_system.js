class BankAccount {
  constructor(balance) {
    this.balance = balance;
  }

  showBalance(balance) {
    document.getElementById('saldo').textContent = balance;
  }

  showMessage(message) {
    document.getElementById('pesan').textContent = message;
  }

  deposit() {
    let depositAmount = parseFloat(
      prompt('Masukkan jumlah saldo yang ingin ditambah: ')
    );

    if (!isNaN(depositAmount) && depositAmount > 0) {
      setTimeout(() => {
        this.balance += depositAmount;
        this.showMessage(
          `Saldo berhasil ditambahkan sebesar ${depositAmount}.`
        );
        this.showBalance(this.balance);
      }, 1000);
      return;
    }
    this.showMessage(
      'Jumlah yang dimasukkan tidak valid atau kurang dari atau sama dengan 0.'
    );
  }

  withdraw() {
    let withdrawAmount = parseFloat(
      prompt('Masukkan jumlah saldo yang ingin dikurangi: ')
    );

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      this.showMessage(
        'Jumlah yang dimasukkan tidak valid atau kurang dari atau sama dengan 0.'
      );
      return;
    }

    if (withdrawAmount <= this.balance) {
      setTimeout(() => {
        this.balance -= withdrawAmount;
        this.showMessage(`Saldo berhasil dikurangi sebesar ${withdrawAmount}.`);
        this.showBalance(this.balance);
      }, 1000);
    } else {
      this.showMessage('Saldo tidak mencukupi.');
    }
  }
}

const bank = new BankAccount(1000000);
