const input = document.querySelector('.my_input');
const btn = document.querySelector('.btn_grid .form_btn');
const my_form = document.querySelector('#myForm');
const client_id = 'f84218c1858802e01a64';
const client_secret = '9395a7d4a14bc64599bf626da0356d41a2f390f4';
const img_url = document.querySelector('.img_div img');
const profile = document.querySelector('.div_details a')
const repo = document.querySelector('.btn_div a:nth-child(1) span');
const gist = document.querySelector('.btn_div a:nth-child(2) span');
const followers = document.querySelector('.btn_div a:nth-child(3) span');
const following = document.querySelector('.btn_div a:nth-child(4) span');
const company = document.querySelector('.company h4 span');
const website = document.querySelector('.website h4 span');
const locations = document.querySelector('.location h4 span');
const member = document.querySelector('.member h4 span');
const repo_container =document.querySelector('.repo_info');
const container = document.querySelector('.container1');
const main = document.querySelector('.main')
const div_details = document.querySelector('#profile')
const repos = document.querySelector('#repos')
let html ="";
let itemArr =[]
div_details.classList.add("hidden");
repos.classList.add("hidden");

	btn.addEventListener('click', () => {
      div_details.classList.remove('hidden')
      repos.classList.remove('hidden');
      itemArr=[];
		const val = input.value;
		const user = val.replace(/(^\s+|\s+$)/g, '');
		container.classList.add('show');
		main.classList.add('hide');
		setTimeout(function () {
			container.classList.remove('show');
			main.classList.remove('hide');
		}, 2000);
      const url = `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`;
         fetchUsers(url);
         
   });
      const fetchUsers = async (url) => {
         try{
            const fetch_url = await fetch_user(url);
            const fetch_json = await json_user(fetch_url);
            img_url.src = fetch_json['avatar_url'];
            repo.innerHTML = fetch_json['public_repos'];
            followers.innerHTML = fetch_json['followers'];
            gist.innerHTML = fetch_json['public_gists'];
            following.innerHTML = fetch_json['following'];
            company.innerHTML = fetch_json['company'];
            website.innerHTML = fetch_json['blog'];
            locations.innerHTML = fetch_json['location'];
            const my_date = new Date(fetch_json['created_at']).toLocaleDateString();
            member.innerHTML = my_date;
            if(fetch_url.status==404 && fetch_json.message=="Not Found"){
               window.location = 'page_notfound.html'
            }
            console.log(fetch_url);
            console.log(fetch_json);
            profile.addEventListener('click', () => {
               event.preventDefault();
               window.location = fetch_json.html_url;
            });
            fetchRepo(fetch_json.repos_url);
            input.value = ' ';
         }catch(err){
            console.log('oops',err)
         }
      }

const fetchRepo = async (user)=>{
   console.log(user)
   const repo = await fetch(user);
         const repo_json = await repo.json()
         itemArr = [...repo_json]
         updateRepo(repo_json)
         console.log(itemArr)
}
updateRepo = (items)=>{
   items.forEach(item=>{
         html += `<div class="single-repo"><div class="first">
               <a href="${item.html_url}">${item.name}</a>
            </div><div class="second">
               <a href="${item.stargazers_url}">stars: ${item.stargazers_count}<span><i class="far fa-star" style="padding-left: 1px;"></i></span></a>
               <a href="#">Watchers : ${item.watchers}<span><i class="fa fa-eye" style="background: rgb(178, 176, 176); padding-left: 1px;"></i></span></a>
               <a href="${item.forks_url}">Forks: ${item.forks_count}<span><i class="fa fa-code-branch"
                        style="background: rgb(86, 162, 121);padding-left: 1px;"></i></span></a>
            </div></div>`;
   })
      repo_container.innerHTML=html
      setTimeout(()=>{html=""},1000)
}
fetch_user = (url)=>fetch(url)
json_user = (url)=>url.json()