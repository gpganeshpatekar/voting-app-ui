// isLoggedIn
export const isLoggedIn = () => {
    let data = sessionStorage.getItem("data");
    if(data != null) return true;
    else return false;
}
// doLoggedIn
export const doLoggedIn = (data,next) => {
    sessionStorage.setItem("data",JSON.stringify(data));
    next()
}
// doLoggedOut
export const doLoggedOut = (next) => {
    sessionStorage.removeItem("data");
    next();
};
// Get Current User
export const getCurrentUserDetail = () => {
    if(isLoggedIn()){
        return JSON.parse(sessionStorage.getItem("data")).user;
    }else{
        return undefined;
    }
}
// export const getCurrentUserDetail = () => {
//     if (isLoggedIn()) {
//         const storedData = sessionStorage.getItem("data");
        
//         if (storedData) {
//             try {
//                 const userData = JSON.parse(storedData);
//                 return userData.user;
//             } catch (error) {
//                 console.error("Error parsing user data:", error);
//                 return undefined;
//             }
//         } else {
//             console.warn("No 'data' found in session storage.");
//             return undefined;
//         }
//     } else {
//         return undefined;
//     }
// }
export const getToken = () => {
    if(isLoggedIn()){
        // return JSON.parse(sessionStorage.getItem("token"));
        return JSON.parse(sessionStorage.getItem("data")).token;
    }else{
        return null;
    }
}