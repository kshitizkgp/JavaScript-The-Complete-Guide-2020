class ToolTip {

}

class ProjectItem {
    constructor(id, updateProjectListFunction, type) {
        this.id = id;
        this.type = type;
        this.updateProjectListHandler = updateProjectListFunction;
        this.connectSwitchButton(type);
        this.connectMoreInfoButton();
    }

    connectSwitchButton(type){
        const project = document.getElementById(this.id);
        let switchButton = project.querySelector('button:last-of-type');
        switchButton = DOMHelper.clearEventListener(switchButton);
        switchButton.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchButton.addEventListener(
            'click',
            this.updateProjectListHandler.bind(null, this.id));
    }

    connectMoreInfoButton(){
        const project = document.getElementById(this.id);
        let switchButton = project.querySelector('button:first-of-type');
    }

    update(updateProjectListFn, type) {
        this.updateProjectListHandler = updateProjectListFn;
        this.type = type;
        this.connectSwitchButton(type);
    }
}

class DOMHelper {

    static clearEventListener(element){
        const clonedEle = element.cloneNode(true);
        element.replaceWith(clonedEle);
        return clonedEle;
    }

    static moveElement(elementId, newDestinationSelector){
        const element = document.getElementById(elementId);
        const descElement = document.querySelector(newDestinationSelector);
        descElement.append(element);
    }
}

class ProjectList {

    projects = [];
    constructor(type) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);

        for(const prjItem of prjItems){
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), type));
        }
        console.log(this.projects);
    }

    setSwitchHandler(switchHandlerFunction){
        this.switchHandler = switchHandlerFunction;
    }

    addProject(project) {
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        //const projectIndex = this.projects.findIndex(p => p.id === projectId);
        //this.projects.splice(projectIndex, 1);
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects = this.projects.filter(p => p.id !== projectId);
    }
}

class App {
    static init() {
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished");

        activeProjectList.setSwitchHandler(
            finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandler(
            activeProjectList.addProject.bind(activeProjectList));
    }
}

App.init();
