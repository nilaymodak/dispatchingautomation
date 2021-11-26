# Dispatching Automation

The goal of this repository is to showcase my work on automating the ticket dispatching activity on an ITSM tool called Assyst.
The code shared is best viewed with Atom.
The index html is the main page created for the task. The rest of the scripts can be located in their respective folders.

----

## Things to Note:
1. The version of the Assyst Ticketing tool which was used can automatically classify generated tickets based on specific keywords in the subject line
2. The version of Assyst which was used was robust **BUT** not smart enough to differentiate between tickets based on just the subject line.

----

## Problem Scenario:

### 1. General Challenges:
+ During certain parts of the year. the employee performance cycles caused almost 300-400% spike in the number of tickets which were being logged per day.
+ Because of this particular issue, the workload on the ticket dispatcher was increasing exponentially.
+ Adding more resources to the team for the role of dispatcher was not an option.
+ Due to high number of tickets logged, other resources from the team were needed to resolve the tickets. Hence no more resources could be alloted to assist the Dispatching activity
+ Since, some consultants could already be overloaded, all the rework for reassigning tickets to particular consultants also fell on the dispatcher.
+ The dispatcher had to assign tickets to members from a module in looping fashion. For example, if ticket#1 for a module went to Consultant#1. Ticket#2 for that module should go to Consultant#2. This method had to be followed for all modules. It was easy to lose track of which was the last consultant to whom the ticket was assigned. This may cause the dispatcher to accidentally assign 2 tickets to a certain consultants.
+ There was a severe need for a methodology that can assist the dispatcher.

### 2. Challenges with Assyst Tool
+ Assyst was smart enough to recognize keywords in the subject line of incoming emails. However, the number of keywords was vast.
+ For example, A simple ticket for password reset issue could have multiple subject lines like: 
   Login Issue
   Trouble Logging In
   Password Expired
   Cannot Login
   Password Reset
   Please reset password
   and so on..
+ Since we received many different types of requests apart from just Password Reset requests, relying on keywords alone was not a valid option

----

## Solution:


### 1. Structural Changes in the team
+ Earlier, we had one team configured in our ticketing tool, which included all members from our team irrespective of the module that they worked on.
+ The following changes were suggested by me:  
   a. One single large team in Assyst should be split into smaller teams divided by modules.  
   b. Each ticket should be assigned to a team bucketlist and not to individual consultant.
   c. Each consultant would co-ordinate with his/her team about his/her workload and take up responsibility for the tickets accordingly.  
   d. After a specific period of time, a report would be pulled from the system, which would count the number of tickets resolved by each consultant. If tickets were distributed unequally, the consultants would then adjust their distribution next week accordingly.  
+ The above suggestions if implemented, would mean that the partial load and concern about distribution of tickets was now on the consultants. This in turn would help to balance out the dispatcher's load.
+ A call was to be scheduled every morning to ensure, that communication within each module was constant.

### 2. Changes in Assyst Tool
+ Assyst Ticketing Tool could classify ticket if we could inform the configuration team to only look for specific keywords. Since new modules were created we informed the Assyst configuration team with 5-10 keywords, which were names of each of the modules.
+ An HTML Form was created, which would allow our end users a.k.a **Clients** to fill the details of their issue and select the issue category.  
+ After clicking the submit button, a mail window would open, with the subject line and mail body pre-configured as per the contents filled in the HTML Form. The important thing to note is that, this pre-configured subject line will have the module name set as the prefix.
+ By doing this, each ticket that will be raised for any module, will go to Assyst with a subject line that contains a keyword that Assyst can identify. Furthermore, after identification, Assyst was configured to automatically assign the ticket to the respective module.
+ Initially, when customers were not aware of this new method of raising tickets, the dispatcher's load was reduced by 5-8% per month.
+ Over time, as new clients start using this method to create ticket, we can expect 70-80% automation in dispatching activity. If all clients were to **_ONLY use this method to raise tickets**_, then we can aim for 100% automation of the activity.
