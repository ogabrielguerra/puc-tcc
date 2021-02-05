import React, {useState, createContext, useEffect} from "react";
import {read_cookie} from "sfcookies";

export const BaseContext = createContext();

export const BaseContextProvider = props => {

    const cookie = read_cookie('credentials');
    const baseUrlApi = 'http://localhost/public/api';
    const [favorites, setFavorites] = useState(null);
    const [userBusiness, setUserBusiness] = useState(null);
    const [categories, setCategories] = useState(null);

    const [credentials] = useState({
        userId : cookie.id,
        accessToken : cookie.access_token
    });

    const [urls] = useState({
        login: `${baseUrlApi}/login`,
        userRegister: `${baseUrlApi}/user/add`,
        business: `${baseUrlApi}/business`,
        category: `${baseUrlApi}/category`,
        favorites: `${baseUrlApi}/favorites/${credentials.userId}`,
        businessByUser: `${baseUrlApi}/business/user/${credentials.userId}`,
        businessCategory: `${baseUrlApi}/business/category`,
    });

    if(userBusiness && urls){
        urls.businessUserDetail = `/business/${userBusiness.id}`;
        console.log('USER BUSINESS ', userBusiness)
    }else{
        urls.businessUserDetail = null;
    }

    useEffect(() => {

        if(credentials.userId && urls){
            let favoritesHeaders = new Headers();
            favoritesHeaders.append("Authorization", `Bearer ${credentials.accessToken}`);

            let requestOptions = {
                method: 'GET',
                headers: favoritesHeaders
            };

            fetch(urls.favorites, requestOptions)
                .then(response => response.json())
                .then(response =>setFavorites(response.data))
                .catch(error => console.log('error', error));
        }

        if (!userBusiness && credentials.accessToken) {
            //setUserBusiness(null)
            let businessHeaders = new Headers();
            businessHeaders.append("Authorization", `Bearer ${credentials.accessToken}`);
            businessHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            let requestOptionsUserBusiness = {
                method: 'GET',
                headers: businessHeaders,
            };

            fetch(urls.businessByUser, requestOptionsUserBusiness)
                .then(response => response.status!==200 ? null : response.json())
                .then(data => setUserBusiness(data))
                .catch(error => console.log('error', error));
        }

        if(!categories) {
            fetch(urls.category)
                .then(response => response.json())
                .then(data => setCategories(data))
                .catch(error => console.log('error', error));
        }

    }, [credentials, urls, categories, userBusiness]);

    const queryIsFavorite = (id)=>{
        let isFavorite = false;
        if(favorites){
            favorites.forEach((itemFavorite) => {
                if (itemFavorite.id === id)
                    isFavorite = true;
            });
            return isFavorite;
        }
    }

    const isAuthenticated = () => {
        return (typeof cookie === 'undefined' || cookie.length === 0) ? false : true;
    };

    let obj = {
        urls : urls,
        credentials : credentials,
        favorites : favorites,
        userBusiness : userBusiness,
        categories : categories,
        isAuthenticated : isAuthenticated,
        isFavorite : queryIsFavorite
    }

    let setObj = {};

    return (
        <BaseContext.Provider value={[obj, setObj]}>
            {props.children}
        </BaseContext.Provider>
    );
};