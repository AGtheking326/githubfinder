const APIURL= 'https://api.github.com/users/';
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');


//fetching data from github

async function getuser(username)
{
    try
    {
   const {data}=await axios(APIURL+username); 
   createusercard(data);
   getrepos(username);
    }
    catch(err)
    {
  if(err.response && err.response.status===404)
  {
createrrorcard('No profile with this username');
    }
}
}

async function getrepos(username) {
    try{
    const{data}=await axios(APIURL+username+'/repos?sort=created');
     addrepostocard(data);
}
catch(err)
{
    createrrorcard('Problem fetching repos');
}
     
}

// user card 

function createusercard(user)
{
    const userid=user.name || user.login;
    const userbio=user.bio? `<p>${user.bio}</p>`:'';
    const cardhtml=`
    <div class="card">
    <div>
    <img src="${user.avatar_url}" alt="${userid}" class='avatar'/>
    </div>

    <div class="user-info">
    <h2>${userid}</h2>
    ${userbio}
    <ul>
    <li>${user.followers}<strong>Followers</strong></li>
    <li>${user.following}<strong>Following</strong></li>
    <li>${user.public_repos}<strong>Repos</strong></li>
    </ul>
    <div id="repos"></div>
    </div>
    </div>`;
    main.innerHTML=cardhtml;
}
//add repos to card 

function addrepostocard(repos)
{
    const reposel=document.getElementById('repos');
    repos.slice(0,5).forEach(repo=>
    {
        const repoel=document.createElement('a');
        repoel.classList.add('repo');
        repoel.href=repo.html_url;
        repoel.target='_blank';
        repoel.innerText=repo.name;
        reposel.appendChild(repoel);
    }
    );  
}





///error card creation 
 function createrrorcard(message)
 {
    const cardhtml=`
    <div class="card">
    <h1>${message}</h1>
    </div>`;
    main.innerHTML=cardhtml;
 }

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const user=search.value;
    if(user)
    {
        getuser(user);
        search.value='';
    }
});
