console.log('JavaScript is running!');

function toggleMenu() {
    const leftmenu = document.getElementById('leftmenu');
    const content = document.getElementById('content');
    leftmenu.classList.toggle('open');
    content.classList.toggle('shifted');
}
  