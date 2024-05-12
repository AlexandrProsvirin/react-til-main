import axios from "axios";

export default class UserService {
    static async getUserData() {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.get(`http://26.56.36.119:8000/api/users/${user.id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }

    static async editUserData(name, email, password, birthday, genderId) {
        try {
            const userString = localStorage.getItem('user');
            if (userString !== null) {
                const user = JSON.parse(userString);
                const response = await axios.put(
                    'http://localhost:8000/api/users',
                    {
                        fio: name,
                        email: email,
                        password: password,
                        birthday: birthday,
                        genderId: genderId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );
                if (response.data.status === 'success') {
                    const updatedUser = { ...user, fio: name };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                return response;
            }
        } catch (e) {
            console.error(e);
        }
    }

    static async getUserReviews() {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.get(`http://localhost:8000/api/users/${user.id}/reviews`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }

    static async getUserScores() {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.get(`http://localhost:8000/api/users/${user.id}/ratings`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }

    static async postUserReview(movieId, message) {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.post(`http://localhost:8000/api/users/${user.id}/reviews`, {
                film_id: movieId,
                message: message
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            console.log(response.data)
            return response.data;
        }
    }

    static async setUserRating(movieId, score) {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.post(`http://localhost:8000/api/users/${user.id}/ratings`, {
                film_id: movieId,
                ball: score
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }

    static async removeUserReviewById(id) {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.delete(`http://localhost:8000/api/users/${user.id}/reviews/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }

    static async removeUserScoreById(id) {
        if (localStorage.getItem("user") !== null) {
            const user = JSON.parse(localStorage.user);
            const response = await axios.delete(`http://localhost:8000/api/users/${user.id}/ratings/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            return response.data;
        }
    }
}