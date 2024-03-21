import "./style.css";


const content = document.getElementById('content') as HTMLDivElement;
const buttons = document.getElementById('buttons') as HTMLDivElement;

let currentPage: string | null = null;

interface Page{
  name: string;
  url: string;
}

/*interface NewButton{
  name: string;
  content: string;
}*/

interface Project {
  id: number;
  title: string;
  image: string;
  overview: string;
  details: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project 1',
    image: '/assets/project1.jpg',
    overview: 'A brief overview of Project 1.',
    details: [
      'Detailed description of Project 1.',
      'Additional information about Project 1.',
      // Add more details as needed
    ],
  },
  {
    id: 2,
    title: 'Project 2',
    image: '/assets/project1.jpg',
    overview: 'A brief overview of Project 2.',
    details: [
      'Detailed description of Project 2.',
      'Additional information about Project 2.',
      // Add more details as needed
    ],
  }
  // Add more project objects
];

const Pages: Page[] = [
  { name: 'Home', url: 'home.html' },
  { name: 'UI/UX', url: 'uiux.html' },
  { name: 'Games', url: 'games.html' },
  { name: 'About', url: 'about.html' }

]

/*onst UiButtons: NewButton[] = [
  { name: 'p1', content: 'this is p1' },
  { name: 'p2', content: 'this is p2' }
]*/

addPage(Pages);

loadPage('home.html');

/*function addButton(buttons: NewButton[]) {
  const overview = document.getElementById('projectOverview') as HTMLDivElement;
  buttons.forEach(button => {
    const b = document.createElement('button');
    b.innerHTML = button.name;
    b.addEventListener('click', () => {
      overview?.append(button.content);
    });
    overview?.append(b);

  });
}*/

function addPage(pages: Page[]) {
  pages.forEach(page => {
    const button = document.createElement('button');
    button.innerHTML = page.name;
    button.addEventListener('click', () => {
      loadPage(page.url);
    });
    buttons.append(button);
  });
}



function loadPage(url: string) {
  if (url != currentPage) {
    console.log(url, currentPage);
    fetch(url)
      .then(response => response.text())
      .then(data => {            
        content.innerHTML = data;
        currentPage = url;
        if (url == 'uiux.html') {
          generateProjectOverview();
          handleProjectDetailButtons();
          handleBackButton();
        }
        
      })
      .catch(error => {
        console.error('Error loading page:', error);
      });
  }
}



function generateProjectOverview() {
  const projectOverview = document.getElementById('projectOverview');
  
  // Clear previous project overview
  projectOverview!.innerHTML = '';

  // Generate project overview
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
      <h3>${project.title}</h3>
      <img src="${'./assets/project.gif'}" alt="${project.title}" width="400" 
      height="400" >
      <p>${project.overview}</p>
      <button data-project-id="${project.id}">Click for Detail</button>
    `;
    projectOverview?.appendChild(projectElement);
  });
}

function handleProjectDetailButtons() {
  const projectOverview = document.getElementById('projectOverview');
  const projectDetails = document.getElementById('projectDetails');

  // Handle click event for project detail buttons
  projectOverview?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') {
      const projectId = parseInt(target.getAttribute('data-project-id') || '');
      const project = projects.find(p => p.id === projectId);
      if (project) {
        projectOverview.style.display = 'none';
        projectDetails!.innerHTML = `
          <h3>${project.title}</h3>
          ${project.details.map(detail => `<p>${detail}</p>`).join('')}
          <button id="backButton">Back</button>
        `;
        if (projectDetails) {
          projectDetails.style.display = 'block';
        }
        
      }
    }
  });
}

function handleBackButton() {
  const projectOverview = document.getElementById('projectOverview');
  const projectDetails = document.getElementById('projectDetails');

  // Handle click event for back button
  projectDetails?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.id === 'backButton') {
      projectDetails.innerHTML = '';
      projectDetails.style.display = 'none';
      if(projectOverview){
        projectOverview.style.display = 'block';}
    }
  });
}




