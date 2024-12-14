document.addEventListener("DOMContentLoaded", function () {
  const binary1Input = document.getElementById("binary1");
  const binary2Input = document.getElementById("binary2");
  const processButton = document.querySelector(
    "button[onclick='processBinary()']"
  );
  const outputDiv = document.getElementById("output");

  // **Proses Penjumlahan Dua Prefix Biner**
  if (binary1Input && binary2Input && processButton) {
    processButton.addEventListener("click", function () {
      const binary1 = binary1Input.value.trim();
      const binary2 = binary2Input.value.trim();

      // Validasi input: hanya angka 0 dan 1
      if (!/^[01]+$/.test(binary1) || !/^[01]+$/.test(binary2)) {
        outputDiv.innerHTML =
          "<p style='color: red;'>Silakan masukkan bilangan biner yang valid (hanya 0 dan 1).</p>";
      } else {
        // Menyamakan panjang kedua bilangan biner
        const maxLength = Math.max(binary1.length, binary2.length);
        const paddedBinary1 = binary1.padStart(maxLength, "0");
        const paddedBinary2 = binary2.padStart(maxLength, "0");

        // Gabungkan kedua bilangan dengan simbol pemisah
        let tape = `${paddedBinary1}B${paddedBinary2}`.split("");
        let head = 0; // Posisi awal
        let state = "q0"; // State awal
        let carry = 0; // Variabel carry untuk penjumlahan
        const transitions = {
          q0: {
            0: ["0", "R", "q0"],
            1: ["1", "R", "q0"],
            B: ["B", "R", "q1"], // Pindah ke state q1 saat menemui 'B'
          },
          q1: {
            0: ["0", "R", "q1"],
            1: ["1", "R", "q1"],
            B: ["B", "L", "q2"], // Kembali untuk proses penjumlahan
          },
          q2: {
            0: ["0", "L", "q2"],
            1: ["1", "L", "q2"],
            B: ["B", "L", "q3"], // Siap untuk menghasilkan hasil
          },
          q3: {
            0: ["0", "L", "q3"],
            1: ["1", "L", "q3"],
            B: ["B", "R", "halt"], // Mesin berhenti
          },
        };

        // Simulasi mesin Turing
        while (state !== "halt") {
          const symbol = tape[head] || "B";
          const transition = transitions[state]?.[symbol];

          if (!transition) break;

          const [write, move, nextState] = transition;

          tape[head] = write;
          head += move === "R" ? 1 : -1;
          state = nextState;

          // Tambahkan simbol blank (B) jika keluar batas pita
          if (head < 0) {
            tape.unshift("B");
            head = 0;
          } else if (head >= tape.length) {
            tape.push("B");
          }
        }

        const resultBinary = tape.join("").replace(/B/g, ""); // Hapus simbol 'B'

        // Mengonversi hasil biner ke integer
        const resultInteger = parseInt(resultBinary, 2);

        // Tampilkan hasil biner dan hasil konversi integer
        outputDiv.innerHTML = `
          <p>Hasil Penjumlahan Biner: <strong>${resultBinary}</strong></p>
          <p>Hasil dalam Integer: <strong>${resultInteger}</strong> (Biner: ${resultBinary} = Desimal: ${resultInteger})</p>
        `;
      }
    });
  }

  // **Konversi Binary ke Integer**
  const binaryToIntInput = document.getElementById("binaryToIntInput");
  const binaryToIntButton = document.querySelector(
    "button[onclick='convertBinaryToInt()']"
  );
  const binaryToIntOutput = document.getElementById("output");

  if (binaryToIntInput && binaryToIntButton) {
    binaryToIntButton.addEventListener("click", function () {
      const binary = binaryToIntInput.value.trim();

      if (!/^[01]+$/.test(binary)) {
        binaryToIntOutput.innerHTML =
          "<p style='color: red;'>Silakan masukkan bilangan biner yang valid (hanya 0 dan 1).</p>";
      } else {
        const integer = parseInt(binary, 2);
        binaryToIntOutput.innerHTML = `
          <p>Nilai Biner: <strong>${binary}</strong></p>
          <p>Nilai Integer: <strong>${integer}</strong></p>`;
      }
    });
  }

  // **Konversi Integer ke Binary**
  const intToBinaryInput = document.getElementById("intToBinaryInput");
  const intToBinaryButton = document.querySelector(
    "button[onclick='convertIntToBinary()']"
  );
  const intToBinaryOutput = document.getElementById("output");

  if (intToBinaryInput && intToBinaryButton) {
    intToBinaryButton.addEventListener("click", function () {
      const integerInput = intToBinaryInput.value.trim();
      const integer = parseInt(integerInput);

      if (isNaN(integer)) {
        intToBinaryOutput.innerHTML =
          "<p style='color: red;'>Silakan masukkan integer yang valid.</p>";
      } else {
        const binary = integer.toString(2);
        intToBinaryOutput.innerHTML = `<p>Nilai Biner: <strong>${binary}</strong></p>`;
      }
    });
  }
});
