import { SaveProjects } from "./actions/api";
import { geotechLogo } from "./svg";
class Geotech {

    getUser() {
        const { myuser } = this.props;
        return myuser?._id ? myuser : null;
    }

    getProjects() {
        let { projects } = this.props;

        if (projects && !Array.isArray(projects)) {
            projects = projects.projects;
        }

        return Array.isArray(projects) ? projects : [];
    }

    getProjectByID(projectId) {
        const geotech = new Geotech();
        return geotech.getProjects.call(this).find(
            p => p.projectid === projectId
        ) || null;
    }



    getProjectKeyByID(projectId) {
        const { projects } = this.props;
        if (!projects) return null;

        const index = projects.findIndex(
            project => project.projectid === projectId
        );

        return index === -1 ? null : index;
    }

    getBorings(projectid) {
        const geotech = new Geotech();
        const project = geotech.getProjectByID.call(this, projectid);

        return project?.borings ?? [];
    }

    getBoringById(projectid, boringid) {
        const geotech = new Geotech();
        const borings = geotech.getBorings.call(this, projectid) ?? [];

        return borings.find(b => b.boringid === boringid) || null;
    }

   getSamplesByBoringId(projectid, boringid) {
    const geotech = new Geotech();
    const boring = geotech.getBoringById.call(this, projectid, boringid);

    return boring?.samples ?? [];
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