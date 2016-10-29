export function getIDAndRoleFromLocalStorage() {
        let userBasicDetails = {
            _id: localStorage.getItem('_id'),
            role: localStorage.getItem('role')
        };

        return userBasicDetails;        
    }

export function getUserDetailsFromLocalStorage() {
    let userDetails = {
        details: JSON.parse(localStorage.getItem('userDetails'))
    };

    return userDetails;        
}; 