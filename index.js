// id image company postedAt contract location role position
const jobListings = [
  {
    id: 1,
    company: "Photosnap",
    image: "./images/companyLogo.jpg",

    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    dutyType: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    framework: [],
  },
  {
    id: 2,
    company: "Manage",
    image: "./images/companyLogo.jpg",

    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    dutyType: "Part Time",
    location: "Remote",
    languages: ["Python"],
    framework: ["React"],
  },
  {
    id: 3,
    company: "Account",
    image: "./images/companyLogo.jpg",

    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    dutyType: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    framework: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    image: "./images/companyLogo.jpg",

    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    dutyType: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    framework: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    image: "./images/companyLogo.jpg",

    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    dutyType: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    framework: ["Ruby", "Sass"],
  },
];

//classes variable
const TAG_ACTIVE_CLASS = "tag__active";
const SEARCH_HIDDEN_CLASS = "search__hidden";
const CLOSE_TAG_CLASS = "close__tag";
const TAG_CLASS = "tag";

function getTagHTML(tag, tagClass = TAG_CLASS) {
  return `<span class="${tagClass} ">
${tag}</span>
`;
}

function getJobListingHTML(jobData, filterTags = []) {
  //   console.log(jobData);
  let JOB_TAGS_PLACEHOLDER = "JOB_TAGS_PLACEHOLDER";
  let jobListingHTML = `
<div class="jobs__item">
<div class="jobs__column jobs__column__left">
  <img class="jobs__img" src=${jobData.image} alt=${jobData.company}>
  <div class="jobs__info">
    <span class="jobs__company">
     ${jobData.company}
    </span>
    <span class="jobs__title">
   ${jobData.position}
    </span>
    <ul class="jobs__details">
      <li class="jobs__details__item">${jobData.postedAt}</li>
      <li class="jobs__details__item">${jobData.dutyType}</li>
      <li class="jobs__details__item">${jobData.location}</li>
    </ul>
  </div>
</div>
<div class="jobs__column jobs__column__right">
${JOB_TAGS_PLACEHOLDER}
</div>
</div>
`;

  //creating all tags arrays
  const tagsArray = [
    jobData.role,
    jobData.level,
    ...(jobData.languages || []),
    ...(jobData.framework || []),
  ];

  const passesFilter =
    !filterTags.length || filterTags.every((tag) => tagsArray.includes(tag));
  if (!passesFilter) {
    return ``;
  }

  const tagsString = tagsArray.reduce((prev, currTag) => {
    const activeClass =
      (filterTags.includes(currTag) && TAG_ACTIVE_CLASS) || "";

    return prev + getTagHTML(currTag, `${TAG_CLASS} ${activeClass}`);
  }, "");
  return jobListingHTML.replace(JOB_TAGS_PLACEHOLDER, tagsString);
}
//getJobListingHTML()  closed here

//toggle active class

function toggleClass(el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className);
    return;
  }
  el.classList.add(className);
}

function getSearchBarTag(tagValue, searchId) {
  let searchBarTags = Array.from(searchId.children)
    .map((node) => node.innerHTML && node.innerHTML.trim())
    .filter((tag) => !!tag);

  //removing duplicate tags from search bar
  if (searchBarTags.includes(tagValue)) {
    searchBarTags = searchBarTags.filter((tag) => tag !== tagValue);
  } else {
    searchBarTags = [...searchBarTags, tagValue];
  }

  return searchBarTags;
}

function setJobListings(filterTags) {
  //job listing html
  const jobsListingsHTML = jobListings.reduce((prev, curr) => {
    return prev + getJobListingHTML(curr, filterTags);
  }, "");

  //adding jobsListingsHTML  to job div
  const jobsDiv = document.getElementById("jobs");
  jobsDiv.innerHTML = jobsListingsHTML;
}

function setSearchbarContent(searchId, tags) {
  searchId.innerHTML = tags.reduce((acc, currentTag) => {
    return acc + getTagHTML(currentTag, CLOSE_TAG_CLASS);
  }, "");
}

//remove search bar when no tags
function resetState(searchId) {
  console.log("clicked");
  searchId.innerHTML = "";

  setJobListings();
  displaySearchWrapper(false);
  //   toggleClass(targetEl, TAG_ACTIVE_CLASS);
}

function displaySearchWrapper(display = false) {
  const searchWrapper = document.getElementById("search");

  if (display) {
    searchWrapper.classList.remove(SEARCH_HIDDEN_CLASS);
    return;
  }
  searchWrapper.classList.add(SEARCH_HIDDEN_CLASS);
}

// adding click event on the tag clicked
window.addEventListener("click", (e) => {
  const targetEl = e.target;
  const tagValue = targetEl.innerHTML.trim();
  const searchId = document.getElementById("search__id");
  const searchBarTags = getSearchBarTag(tagValue, searchId);
  //   const tagClasses = [TAG_CLASS, CLOSE_TAG_CLASS];

  console.log(targetEl.innerHTML, "taget");
  //on clear click
  if (targetEl.innerHTML.toLowerCase() === "clear" || !searchBarTags.length) {
    console.log("is it even clicking");
    resetState(searchId);
    return;
  }

  if (
    ![TAG_CLASS, CLOSE_TAG_CLASS].some((c) => targetEl.classList.contains(c))
  ) {
    return;
  }

  //toggle search bar tag
  //   toggleSearchBarTag(tagValue);

  //   searchId.innerHTML = searchBarTags.reduce((prev, curr) => {
  //     return prev + getTagHTML(curr, CLOSE_TAG_CLASS);
  //   }, "");

  setSearchbarContent(searchId, searchBarTags);

  //toggle active class
  toggleClass(targetEl, TAG_ACTIVE_CLASS);

  //remove search bar when no tags
  displaySearchWrapper(searchBarTags.length > 0);

  setJobListings(searchBarTags);
});
setJobListings();
