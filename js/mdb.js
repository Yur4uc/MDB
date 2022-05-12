

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    

    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = document.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');
    
          

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;

        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`; 
            }
            // скорочуємо назву фільму до 21 символу !

            if (favorite) {
                console.log("Добавляємо улюлений фільм")
            }

            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies); // сортировка
    
            createMoviesList(movieDB.movies, movieList);
        }

        event.target.reset(); 
    });
    // коли користовучав вводить фільм та клікає підтвердити, фільм попадає  у список!
   
    
    const deleteAdv = (arr) => {
        adv.forEach(item => {
            item.remove(); //1
        }); // видалення реклами на сторІнці!
    }
    

    const makeChanges = () => {
        genre.textContent = 'драма'; // 2
    
        poster.style.backgroundImage = 'url("img/bg.jpg")'; //3 міняємо фон
    }
 

    
    const sortArr = (arr) => {
        arr.sort(); // сортуємо по алфавіту
    }


    function createMoviesList (films, parent) {
            // 4
        parent.innerHTML = ""; // видаляємо фільми !
        sortArr(films); // сортировка по алфавіту
        
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class = "promo__interactive-item">${i + 1} ${film}
                    <div class = "delete"></div>
                </li>
            `;
                
        }); 

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1); // видаляємо елеимент із масива !
                
                createMoviesList(films, parent); // робимо фільми при видаленні з правильною нумерацією

            })
        });
    }

    deleteAdv();
    makeChanges();
    createMoviesList(movieDB.movies, movieList);

});
