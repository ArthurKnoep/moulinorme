/*
** file.js for moulinorme in /file.js
** 
** Made by Arthur Knoepflin
** Login arthur.knoepflin@epitech.eu
** 
** Started on Sun Oct 08 2017 16:02:17
** Last update Sun Oct 08 16:10:21 2017
** By Arthur Knoepflin
*/

'use strict';

module.exports = {
    verify_c_file: function(path_file, config) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(20);
            }, 2000);
        });
    }
};