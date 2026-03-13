const form = document.getElementById("booking-form");
const result = document.getElementById("result");
const dateInput = document.getElementById("date");

const basePrices = {
  "دبي": 1400,
  "إسطنبول": 2100,
  "القاهرة": 1600,
  "الرياض": 900,
};

const today = new Date().toISOString().split("T")[0];
dateInput.min = today;

function formatArabicDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const destination = document.getElementById("destination").value.trim();
  const date = dateInput.value;
  const travelers = Number(document.getElementById("travelers").value);

  if (!destination || !date || travelers < 1) {
    result.textContent = "يرجى تعبئة جميع الحقول بشكل صحيح.";
    return;
  }

  if (date < today) {
    result.textContent = "تاريخ السفر يجب أن يكون اليوم أو تاريخًا مستقبليًا.";
    return;
  }

  const base = basePrices[destination] ?? 1800;
  const total = base * travelers;
  const formattedDate = formatArabicDate(date);

  result.textContent = `التكلفة التقديرية لرحلة ${destination} بتاريخ ${formattedDate} لعدد ${travelers} مسافر/مسافرين هي ${total.toLocaleString("ar-SA")} ريال.`;
});
