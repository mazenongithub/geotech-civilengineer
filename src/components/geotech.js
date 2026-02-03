class Geotech {

     getUser() {
        const user = this.props.myuser;

        // Must exist AND have a valid _id
        if (user && user._id) {
            return user;
        }

        return false;
    }

    getRegularFont() {

        if (this.state.width > 800) {
            return ({ fontSize: '30px' })
        } else {
            return ({ fontSize: '24px' })
        }

    }
    getHeaderFont() {

        if (this.state.width > 800) {
            return ({ fontSize: '40px' })
        } else {
            return ({ fontSize: '30px' })
        }

    }
}

export default Geotech;