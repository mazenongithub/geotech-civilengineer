class Geotech {

    getUser() {
        const { myuser } = this.props;
        return myuser?._id ? myuser : null;
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