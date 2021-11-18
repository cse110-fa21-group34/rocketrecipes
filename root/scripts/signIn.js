window.addEventListener('DOMContentLoaded', init);

function init() {
  const testUrl = 'https://google.com';
  const btn = document.getElementById('btn1');
  btn.addEventListener('click', () => {
    console.log("It's working");
    window.open('../html/generalAccount.html');
  });
}
