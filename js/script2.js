//Creating Variables used for outlook

//variable for keyword to be appended at the start of subjet
var appendValue="";
var subjectValue="";
var tomail="target.email@domain.com";
//Variable for Windows username
var windowsun="";

//Varible for Mail Body content
var descriptionValue="";

//URI Encoded mailto link which will be set as our window location
var hrefValue="";

//Request type is used if the value selected in dropdown is not password Reset
//This value contains the subcategory we have selected from the second drpodown
var reqtype = "";

//Creating flag variable for validation
var goflag = 0;

//Creating flag for dropdown creation
//If this flag is set to 1 before change method is called, then old dropdown will be deleted.
//We have set the default to 1 because "None" option has "---" value in the sub category dropdown, which needs to be deleted before the new options are appended.
var created = 1;

//Declaring arrays containing options in dropdowns for each category
//You can add your additional entries at the end of the below elements list.
//The array is automatically sorted before being displayed in the dropdown
var oparraypswd = ["Reset Password","Not able to Login(Not sure Password or SSO)","SSO Not Working","Others"];
var oparrayrcm = ["RCM data migration","Candidate Import","Import Job Requisitions","Application Import","Access rights","Missing vacancy in system","Reports","Others"];
var oparrayec = ["Position Data Change","Position Activation/Inactivation","Mass Data Change","Mass Manager Changes","Mass Foundation Data Upload","Mass HR manager Upload","Mass Department Upload","Hire Date Change","Organization Unit Change","Op/Co Staff Department Change","Org Chart Structure Change","Workflow Issues","Job Code Change","Job classification Change","Job Grade Change","Cost Center Change","Job Area Change","Legal Entity Change","Business Group Change","Job Role Change","Local Job Title Change","Global Job Title Change","Functional Discipline Change","Incorrect Employee Data","Email Account Type Change","Wrong Username Maintained In System","Wrong Email Maintained In System","Global Assignment Queries","Reports","Others"];
var oparraycomp = ["Mass Upload Salary","Compensation Statements","Merit Cycle","Changes In Payment Information","Compensation Mass Data Changes","Merit and STIP Sheets","Compensation Imports","Incorrect Compensation Data","Pay Scales","Changes in Pay Components","Reports","Others"];
var oparraypmtm = ["Objectives","Form Routing","Year End Form","EYR","Objective Settings","Year End Appraisal Forms","Talent Management Cycle","Calibration","RPR Phase","OPA score","Relative Performance Review Session","Launch Performance Form","Appraisal Form","Review Phase","OGF","Personal STIP Objectives","DFE Performance Form","Performance Rating","Performance Review","Report","Others"];
var oparrayboomi = ["Account Not Created","Onboarding Mail Not Sent","Trigger Interface PROD/TEST","Stop Schedule of the Interface","Issue Related To Replication Monitoring","Employee Data Not Sent To System","Others","Wrong username maintained in Outlook","Wrong Email maintained in Outlook"];
var oparraylrn = ["Admin/Superuser account","Learning Report","Learning Activities","Error Messages","Content Import","Notification Issue","Learning Completed But Not Recorded","Item","Catalog","Connector","Course","Learning Plan","Curricula","Assignments","Reports","Others"];
var oparrayhh = ["Report","Configuration","Server Issue","Data Upload","Dashboard","Others"];
var oparraypp = ["Access Issues","Wrong Username","Content Issue","Payslip Issue","Incorrect Subordinate","Others","Recruitment Issue"];
var oparraypa = ["Headcount & FTE Dashboard Reports", "Others", "Login Issues", "Content Issues"];
var oparraymi = ["Access Issues", "Content Issues", "Others"];

//Function to reload page
function rstpage()
{
location.reload();
}

//Function which is called on press of the submit button
//Validate will validate the mandatory inputs
//setsubj will retrieve subject line value
//setpp will retrieve value to be appended at the start
//setdesc will retrieve value to be used as mail Body
//Set href will encode all the above into a URI format and append that athe end of mailto link
//After finishing, the goflag is set to zero and windows username is set to blank

function callall()
{
  validate();
  if(goflag==1)
  {
    setsubj();
    setapp();
    setdesc();
    sethref();
    alert("Please DO NOT CHANGE the starting portion {XXXX} of the subject line");
    window.location.href = hrefValue;
    goflag =0;
    windowsun="";
  }
}


//Validate all the inputs
function validate()
{
  //declarings flags for subject, dropdown and description
  var fsub=0;
  var fdd=0;
  var fdesc=0;


  //validate subjectline. If the value is not blank flag set to 1
  //trim function deletes all whitespaces, so if the subject is only made of whitespaces, trim will output null
  var subjectline = document.getElementById("subject").value;
  if((subjectline!="") && (subjectline.trim()!=null))
  {
    fsub = 1;
  }
  else
  {
    alert("Please enter a proper subject line!");
  }

  //validate dropdown value. If the option selected is not None flag set to 1
  var e = document.getElementById("mod1");
  var ddvalue = e.options[e.selectedIndex].value;
  if(ddvalue!="")
  {
    fdd=1;
  }
  else
  {
    alert("Please select category value from dropdown!");
  }

  //validate description. If value is not blank set flag to 1
  var desc_text = document.getElementById("descta").value;
  if((desc_text!="")&&(desc_text.trim() !=null))
  {
    fdesc=1;
  }
  else
  {
    alert("Please enter a valid description!");
  }

  //Set value for Global Flag
  if(fsub==1 && fdd==1 && fdesc==1)
  {
    goflag = 1;

  }
  else
  {
    goflag = 0;
  }
}


//setting the target mailto location in a string
function sethref()
{
  //Spaces are not allows in URLs.
  //encodeURIComponent is used to convert strings with spaces or other special characters to the URL format
  //+encodeURIComponent(fullname)+"%0D%0A"
  var d = document.getElementById("mod1");
  var ddvalue1 = d.options[d.selectedIndex].value;
  if(ddvalue1=="LOGIN")
  {
    hrefValue="mailto:"+tomail+"?subject="+encodeURIComponent(appendValue)+encodeURIComponent(subjectValue)+"&body="+encodeURIComponent(windowsun)+"%0D%0A%0D%0A"+encodeURIComponent(descriptionValue);
  }
  else
  {
    hrefValue = "mailto:"+tomail+"?subject="+encodeURIComponent(appendValue)+encodeURIComponent(subjectValue)+"&body="+encodeURIComponent(reqtype)+"%0D%0A%0D%0A"+encodeURIComponent(descriptionValue);
  }
}

//preparing subjectline string to be inserted in sethref
function setsubj()
{
subjectValue = document.getElementById("subject").value;
}

//Preparing description string to be inserted in sethref
function setdesc()
{
  var d = document.getElementById("mod1");
  var ddvalue1 = d.options[d.selectedIndex].value;
  if(ddvalue1=="LOGIN")
  {
    windowsun = "Windows Username: " + document.getElementById("wusername").value;
  }
  else {
    var dd2 = document.getElementById("newDropdownMenu");
    var ddvalue2 = dd2.options[dd2.selectedIndex].value;
    reqtype = "Request Type: " + ddvalue2;
  }
descriptionValue = document.getElementById("descta").value;
}

//Preparing the value to be appended at start
function setapp()
{
var e = document.getElementById("mod1");
var ddvalue1 = e.options[e.selectedIndex].value;
appendValue = "{"+ ddvalue1+"} ";
}


//Function to remove old dropdown(2nd Dropdown for subcategory) from the division
function removeDrop()
{
  //Function to remove old dropdow list
  //Choosing the parent
    var d = document.getElementById('mod2');
    //Choosing the child element
    var oldmenu = document.getElementById('newDropdownMenu');
    //Deleting the child through parent method
    d.removeChild(oldmenu);
}


//function to display new dropdown(2nd dropdown for subcategory) in division
function displayAccordingly()
{

    if (created == 1)
    {
        removeDrop();
    }

    //Main menu whose value decides the value for second dropdown
    var mainMenu = document.getElementById('mod1');

    //Create the new dropdown menu
    var whereToPut = document.getElementById('mod2');
    var newDropdown = document.createElement('select');
    newDropdown.setAttribute('id',"newDropdownMenu");
    whereToPut.appendChild(newDropdown);

    if (mainMenu.value == "LOGIN")
    {
      //The person chose PASSWORD from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraypswd.sort();
      //Fetching the array length
      var arlenpswd = oparraypswd.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenpswd; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraypswd[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "EC")
    {
      //The person chose Employee Central from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparrayec.sort();
      //Fetching the array length
      var arlenec = oparrayec.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenec ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparrayec[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "COMP")
    {
      //The person chose Compensation from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraycomp.sort();
      //Fetching the array length
      var arlencomp = oparraycomp.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlencomp ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraycomp[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "PMTM")
    {
      //The person chose Performance Management from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraypmtm.sort();
      //Fetching the array length
      var arlenpmtm = oparraypmtm.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenpmtm ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraypmtm[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "BOOMI")
    {
      //The person chose Data Transfer from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparrayboomi.sort();
      //Fetching the array length
      var arlenboomi = oparrayboomi.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenboomi ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparrayboomi[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "RCM")
    {
      //The person chose Recruiting from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparrayrcm.sort();
      //Fetching the array length
      var arlenrcm = oparrayrcm.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenrcm ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparrayrcm[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "LRN")
    {
      //The person chose Learning from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraylrn.sort();
      //Fetching the array length
      var arlenlrn = oparraylrn.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenlrn ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraylrn[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "HH")
    {
      //The person chose Learning from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparrayhh.sort();
      //Fetching the array length
      var arlenhh = oparrayhh.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenhh ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparrayhh[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "PP")
    {
      //The person chose Other issues from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraypp.sort();
      //Fetching the array length
      var arlenpp = oparraypp.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenpp ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraypp[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "PA")
    {
      //The person chose Other issues from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraypa.sort();
      //Fetching the array length
      var arlenpa = oparraypa.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenpa ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraypa[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "MI")
    {
      //The person chose Other issues from parent dropdown(1st Dropdown for Category)
      //Sorting the options array created above alphabetically
      oparraymi.sort();
      //Fetching the array length
      var arlenmi = oparraymi.length;
      //Looping through the array and appending the elements one by one
      for(i=0; i<arlenmi ; i++)
      {
        //This will create a framework for option
        var optionname = document.createElement("option");
        //This will set the text inside the option
        optionname.text= oparraymi[i];
        //This will add the option in the newDropdown element
        newDropdown.add(optionname,newDropdown.options[null]);
      }
    }
    else if (mainMenu.value == "NMA")
    {
      //The person chose Not Mentioned from parent dropdown(1st Dropdown for Category)
      //This will create a framework for option
      var optionname = document.createElement("option");
      //This will set the text inside the option
      optionname.text= 'Not Mentioned In List';
      //This will add the option in the newDropdown element
      newDropdown.add(optionname,newDropdown.options[null]);
    }
    else if (mainMenu.value == "")
    {
      //Person chose None from parent dropdown(1st Dropdown for Category)
      //This will create a framework for option
      var optionname = document.createElement("option");
      //This will set the text inside the option
      optionname.text= '---';
      //This will add the option in the newDropdown element
      newDropdown.add(optionname,newDropdown.options[null]);
    }
    //Setting the creation flag for 2nd dropdown to 1
    created = 1;

    if (mainMenu.value == "LOGIN")
    {
      //where the elements need to be put under
      var target = document.getElementById('wuser');

      //creating a textbox
      var newTextInput = document.createElement('input');
      //setting the needed attributes like type and id
      newTextInput.setAttribute('type',"text");
      newTextInput.setAttribute('id',"wusername");

      //creating a label
      var newLabel = document.createElement('label');
      //setting attributes like id and for
      newLabel.setAttribute('id',"unlabel");
      newLabel.setAttribute('for',"username");

      //Creating an anchor
      var newAnchor = document.createElement('A');
      //Setting attributes like id and href address
      newAnchor.setAttribute('id',"docaddress");
      newAnchor.setAttribute('target',"_blank");
      newAnchor.setAttribute('href',"docs/FindOutWindowsUsername.pdf")

      //Appending the label first, setting it's text, then appending the document link and then appending the textbox
      target.appendChild(newLabel);
      document.getElementById('unlabel').innerHTML = "Please enter the windows username of the person facing login issue as shown in the attached guide:";

      target.appendChild(newAnchor);
      document.getElementById('docaddress').innerHTML = 'Link to guide';
      target.appendChild(newTextInput);
    }
    else
    {
      //removing the textbox
      var txtbox = document.getElementById('wusername');
      txtbox.parentNode.removeChild(txtbox);

      //setting the label text to blank
      document.getElementById('unlabel').innerHTML = '';

      var anchorlink = document.getElementById('docaddress');
      anchorlink.parentNode.removeChild(anchorlink);
    }

}

//disabling the annoying pop up which happens when you accidentally press Ctrl+S
document.onkeydown = function (e) {
    e = e || window.event;//Get event
    if (e.ctrlKey) {
        var c = e.which || e.keyCode;//Get key code
        switch (c) {
            case 83://Block Ctrl+S
                e.preventDefault();
                e.stopPropagation();
            break;
        }
    }
}
