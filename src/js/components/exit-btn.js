const regBtnText = document.querySelector('.registration-btn_text');
const exitBtnEl = document.querySelector('.exit-btn')
const navigationLibraryEl = document.querySelector('.navigation_library');

exitBtnEl.addEventListener('click', OnExitBtnClick);

export function OnExitBtnClick() {
    window.location.reload();

}

export function showMyLibrary() {
    navigationLibraryEl.classList.remove('hidden');
}
