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
            return ({ fontSize: '20px' })
        } else {
            return ({ fontSize: '18px' })
        }

    }
    getHeaderFont() {

        if (this.state.width > 800) {
            return ({ fontSize: '24px' })
        } else {
            return ({ fontSize: '20px' })
        }

    }
}

export default Geotech;