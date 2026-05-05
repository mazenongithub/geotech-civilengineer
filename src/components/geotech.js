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

     getFieldReports(projectid) {
        const geotech = new Geotech();
        const project = geotech.getProjectByID.call(this, projectid);

        return project?.fieldreports ?? [];
    }

     getimagesbyfieldid(projectid, fieldid) {
        const geotech = new Geotech();
        const fieldreport = geotech.getFieldReportById.call(this, projectid, fieldid);
        if (!fieldreport || !Array.isArray(fieldreport.images)) return false;

        return fieldreport.images;
    }

      getcurves(projectid) {
        const geotech = new Geotech();
        const project = geotech.getProjectByID.call(this, projectid);

        if (!project) return false;

        return project.compactioncurves || false;
    }


      getcurvebyid(projectid, curveid) {
        const geotech = new Geotech();
        const curves = geotech.getcurves.call(this, projectid);

        return curves?.find(curve => curve.curveid === curveid) || false;
    }

      getcompactiontestsbyfieldid(projectid, fieldid) {

        const geotech = new Geotech();
        const fieldreport = geotech.getFieldReportById.call(this, projectid, fieldid)

        let compactiontests = false;
        if (fieldreport) {
            if (fieldreport.hasOwnProperty("compactiontests")) {
                compactiontests = [];

                // eslint-disable-next-line
                fieldreport.compactiontests.map(test => {


                    const testid = test.testid;
                    const testnum = test.testnum;
                    const elevation = test.elevation;
                    const location = test.location;
                    const wetpcf = test.wetpcf;
                    const moistpcf = test.moistpcf;
                    const timetest = test.timetest;


                    const curve = geotech.getcurvebyid.call(this, projectid, test.curveid);
                    const dryden = () => {

                        if (wetpcf && moistpcf) {
                            return (Number(Number(wetpcf) - Number(moistpcf)).toFixed(1));
                        } else {
                            return 0;
                        }
                    }
                    const moist = () => {

                        if (test.moistpcf && test.wetpcf) {
                            let dryden = Number(test.wetpcf) - Number(test.moistpcf);

                            return (Number((Number(test.moistpcf) / Number(dryden)) * 100).toFixed(1));
                        } else {
                            return 0;
                        }
                    }
                    const maxden = () => {
                        if (curve.maxden) {
                            return (Number(curve.maxden));
                        } else {
                            return (0)
                        }
                    }

                    const relative = () => {


                        if (curve.maxden && test.wetpcf && test.moistpcf) {
                            let maxden = Number(curve.maxden)
                            let dryden = Number(test.wetpcf) - Number(test.moistpcf);

                            return (Math.round((dryden / maxden) * 100))
                        } else {
                            return 0;
                        }

                    }
                    const calcrelative = relative();
                    const calcdryden = dryden();
                    const calcmoist = moist()
                    const calcmaxden = maxden();
                    const curveid = curve.curveid;
                    compactiontests.push({ testid, testnum, timetest, elevation, location, wetpcf, moistpcf, dryden: calcdryden, moist: calcmoist, maxden: calcmaxden, relative: calcrelative, curveid })


                })

            }

        }

        return compactiontests;
    }

     getFieldReportById(projectid, fieldid) {
        const geotech = new Geotech();
        const fieldreports = geotech.getFieldReports.call(this, projectid) ?? [];

        return fieldreports.find(r => r.fieldid === fieldid) || null;
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

   getSampleById(projectId, boringId, sampleId) {
        const geotech = new Geotech();
        const boring = geotech.getBoringById.call(this, projectId, boringId);

        if (!Array.isArray(boring?.samples)) return false;

        return boring.samples.find(s => s.sampleid === sampleId) || false;
    }

     getUnconfinedTestById(projectId, boringId, sampleId) {
        const geotech = new Geotech();
        const sample = geotech.getSampleById.call(this, projectId, boringId, sampleId);

        return sample?.unconfined || false;
    }

       getSieveBySampleId(projectId, boringId, sampleId) {
        const geotech = new Geotech();
        const sample = geotech.getSampleById.call(this, projectId, boringId, sampleId);

        return sample?.sieve || false;
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