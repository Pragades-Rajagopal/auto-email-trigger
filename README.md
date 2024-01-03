# auto-email-trigger
A basic email triggering tool to trigger multiple emails at one go

### Prerequisites

Install dependencies and create local storage
```
# For Mac and Linux
./start.sh

# For Windows
start.bat
```
Create entities in local storage
```
npm run migration
```
Create `.env` file in the root directory and add variables mentioned in 
[.env.sample](.env.sample)

## Execution
### Trigger email
- Place the csv file in `./src/public/sheets` with below fields  
    - `email` - To trigger mails to the email addresses
    - `content` - Contents to be in `HTML` format
- Place the attachment files in `./src/public/attachments` This tool supports upto three file attachments

```
npm start <sheet_name> <attachment_file.extension>? <attachment_file.extension>? <attachment_file.extension>?
```
> "?" is an optional argument

### Export logs
```
npm run spool
```