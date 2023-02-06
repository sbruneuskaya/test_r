const m_id = ['business', 'computing', 'fashion', 'finance', 'law', 'marketing', 'psychology'];
const menuLink = document.querySelectorAll('.sidebar-item')
const card = document.querySelectorAll('.card-back__img')
const activeMenuLink = document.getElementsByClassName('active-link')
const activeSubmenuLink = document.getElementsByClassName('active-submenu')
const submenuItem = document.querySelectorAll('.submenu li')
const cardHidden = document.querySelectorAll('.card-wrapper')
const btnOpenCard = document.querySelector('.card-btn__open')
const mtnMob = document.querySelectorAll('.card-img_mob')
const openMobMenu=document.querySelector('.sidebar-wrapper_mob')

function closeMenuItem() {
    for (let i = 0; i < m_id.length; i++) {
        document.getElementById(m_id[i]).classList.remove('open');
    }
}

function menuOpen(id) {
    let link = document.getElementById(id)
    for (let i = 0; i < m_id.length; i++) {
        if (id !== m_id[i]) {
            document.getElementById(m_id[i]).classList.remove('open');
        }
    }
    if (link.classList.contains('open')) {
        link.classList.remove('open');
    } else {
        link.classList.add('open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    card.forEach(item => {
        item.addEventListener('click', () => {
            item.parentNode.classList.toggle('active')
        })
    })

    closeMenuItem()

    btnOpenCard.addEventListener('click', () => {
        cardHidden.forEach(item => {
            if (item.classList.contains('hidden')) {
                item.classList.remove('hidden')
            }
        })

        btnOpenCard.remove()
    })

    menuLink.forEach(el => {
        el.addEventListener('click', () => {
            menuOpen(el.nextElementSibling.id)
            if (activeMenuLink.length !== 0) {
                if (el.classList.contains('active-link')) {
                    el.classList.remove('active-link')
                } else {
                    activeMenuLink[0].classList.remove('active-link')
                    el.classList.add('active-link');
                }

            } else {
                el.classList.add('active-link');
            }
        })
    })

    submenuItem.forEach(el => {
        el.addEventListener('click', () => {
            if (activeSubmenuLink.length !== 0) {
                activeSubmenuLink[0].classList.remove('active-submenu')
                el.classList.add('active-submenu');
            } else {
                el.classList.add('active-submenu');
            }
        })
    })

    mtnMob.forEach(item => {
        item.addEventListener('click', () => {
            item.parentNode.classList.toggle('active')
        })
    })

    openMobMenu.addEventListener('click', ()=>{
        openMobMenu.nextElementSibling.classList.toggle('active')
        openMobMenu.classList.toggle('active')
        }
    )
})
