import { SaveProjects } from "./actions/api";
class Geotech {

    getUser() {
        const { myuser } = this.props;
        return myuser?._id ? myuser : null;
    }

    getProjects() {
        const { projects } = this.props;
        return Array.isArray(projects) ? projects : null;
    }

    getProjectByID(projectId) {
        const { projects } = this.props;
        if (!projects) return null;

        return projects.find(project => project.projectid === projectId) || null;
    }

   

    getProjectKeyByID(projectId) {
    const { projects } = this.props;
    if (!projects) return null;

    const index = projects.findIndex(
        project => project.projectid === projectId
    );

    return index === -1 ? null : index;
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