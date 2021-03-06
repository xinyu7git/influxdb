const { By } = require('selenium-webdriver');
const settingsPage = require(__srcdir + '/pages/settings/settingsPage.js');

const tokensFilter = '[data-testid=input-field--filter]';
const genTokenButton = '[data-testid=dropdown-button--gen-token]';
const tokenListing = '[data-testid=resource-list]';
//const descHeader = '[data-testid=index-list--header-cell]:nth-of-type(1)';// header no longer present 10.6
//const statusHeader = '[data-testid=index-list--header-cell]:nth-of-type(2)'; //header no longer present 10.6
//const createVariableBody = '[data-testid=button-create-initial]';
const tokenCellTemplate = '[data-testid="token-card %DESCR%"]';
const generateTokenDropdownBtn = '[data-testid=dropdown-button--gen-token]';
const generateTokenItem = '[data-testid=\'dropdown-item generate-token--%ITEM%\']';
const tokenCardDisableToggle = '[data-testid = \'token-card %DESCR%\'] [data-testid=\'slide-toggle\']';
const tokenSorterButton = '[data-testid=resource-sorter--button]';
const tokenSorterItem = '[data-testid=resource-sorter--%ITEM%]';
const tokensSortByDescription = '//*[@data-testid=\'index-list--header-cell\'][text()=\'Description\']';
const tokenDescription = '[data-testid=\'token-name %DESCR%\']';
const tokenDescriptionEditBtn = '[data-testid=\'token-card %DESCR%\']  [data-testid=\'resource-editable-name--button\']';
const tokenDescriptionEditInput = '//*[./*[@data-testid=\'resource-editable-name--input--default\']]/input';
const tokenCardDeleteButton = '[data-testid=\'token-card %DESCR%\'] [data-testid=\'context-menu\']';
// next selector is deprecated - todo clean up
const tokenCardDeleteConfirm = '[data-testid=\'token-card %DESCR%\'] [data-testid=\'delete-token\']';
const tokenCardPopoverDeletConfirm = '//*[@data-testid=\'delete-token--popover--dialog\']//*[text() = \'Confirm\']';

// Generate Read/Write token popup
const descrInput = '[data-testid=\'input-field--descr\']';
const typeRadioButton = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//*[@data-testid=\'select-group--option\'][@title=\'%SET%\']';
const searchBuckets = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//input[@data-testid=\'input-field\'][contains(@placeholder,\'Search buckets\')]';
const emptyStateText = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//*[@data-testid=\'empty-state--text\']';
const searchBucketsListItem = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//*[@data-testid=\'selector-list %NAME%\']';
const selectAllBuckets = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//*[@title=\'Select All\']';
const deselectAllBuckets = '//*[@data-testid=\'flex-box\'][div[text()=\'%MODE%\']]//*[@title=\'Deselect All\']';

//Generate All Access token popup
const allAccessDescrInput = '[data-testid=all-access-token-input]';
const allAccessCancelButton = '[data-testid=button][title=Cancel]';
const allAccessSaveButton = '[data-testid=button--save]';

//Review token popup
const tokenReviewTokenCode = 'div.code-snippet--text pre code';
const tokenReviewPermissions = '[data-testid=permissions-section]';
const tokenReviewPermissionItem = '//*[@data-testid=\'permissions-section\'][.//h3[text()=\'%ITEM%\']]';


const urlCtx = 'tokens';

class tokensTab extends settingsPage{

    constructor(driver){
        super(driver);
    }

    async isTabLoaded(){
        await super.isTabLoaded(urlCtx,
            [
                {type: 'css', selector: tokensFilter},
                {type: 'css', selector: genTokenButton},
                {type: 'css', selector: tokenListing},
                {type: 'css', selector: tokenSorterButton}
            ]
        );
    }

    async getTokenCellByDescr(descr){
        return await this.driver.findElement(By.css(tokenCellTemplate.replace('%DESCR%', descr)));
    }

    static getTokenCellSelectorByDescr(descr){
        return { type: 'css', selector: tokenCellTemplate.replace('%DESCR%', descr)};
    }

    async getGenerateTokenDropdownBtn(){
        return await this.driver.findElement(By.css(generateTokenDropdownBtn));
    }

    async getGenerateTokenItem(item){
        return await this.driver.findElement(By.css(generateTokenItem.replace('%ITEM%', item)));
    }

    async getDescrInput(){
        return await this.driver.findElement(By.css(descrInput));
    }

    async getTypeRadioButton(mode, set){
        return await this.driver.findElement(By.xpath(typeRadioButton
            .replace('%MODE%',mode)
            .replace('%SET%',set)));
    }

    async getSearchBuckets(mode){
        return await this.driver.findElement(By.xpath(searchBuckets.replace('%MODE%', mode)));
    }

    static getSearchBucketsSelector(mode){
        return { type: 'xpath', selector: searchBuckets.replace('%MODE%', mode) };
    }

    async getEmptyStateText(mode){
        return await this.driver.findElement(By.xpath(emptyStateText.replace('%MODE%', mode)));
    }

    static getEmptyStateTextSelector(mode){
        return { type: 'xpath', selector: emptyStateText.replace('%MODE%', mode) };
    }

    async getSearchBucketsListItem(mode, name){
        return await this.driver.findElement(By.xpath(searchBucketsListItem
            .replace('%MODE%', mode)
            .replace('%NAME%', name)));
    }

    static getSearchBucketsListItemSelector(mode, name){
        return { type: 'xpath', selector: searchBucketsListItem
            .replace('%MODE%', mode)
            .replace('%NAME%', name)};
    }

    async getSelectAllBuckets(mode){
        return await this.driver.findElement(By.xpath(selectAllBuckets.replace('%MODE%', mode)));
    }

    async getDeselectAllBuckets(mode){
        return await this.driver.findElement(By.xpath(deselectAllBuckets.replace('%MODE%', mode)));
    }

    async getAllAccessDescrInput(){
        return await this.driver.findElement(By.css(allAccessDescrInput));
    }

    async getAllAccessCancelButton(){
        return await this.driver.findElement(By.css(allAccessCancelButton));
    }

    async getAllAccessSaveButton(){
        return await this.driver.findElement(By.css(allAccessSaveButton));
    }

    async getTokenCardDisableToggle(descr){
        return await this.driver.findElement(By.css(tokenCardDisableToggle.replace('%DESCR%', descr)));
    }

    async getTokenCardDescriptions(){
        return await this.driver.findElements(By.css('[data-testid^="token-name"]'));
    }

    async getTokenSorterButton(){
        return await this.driver.findElement(By.css(tokenSorterButton));
    }

    async getTokenSorterItem(item){
        return await this.driver.findElement(By.css(tokenSorterItem.replace('%ITEM%',
            item.toLowerCase().replace(' ','-'))));
    }

    async getTokensSortByDescription(){
        return await this.driver.findElement(By.xpath(tokensSortByDescription));
    }

    async getTokenDescription(descr){
        return await this.driver.findElement(By.css(tokenDescription.replace('%DESCR%', descr)));
    }

    async getTokenDescriptionEditBtn(descr){
        return await this.driver.findElement(By.css(tokenDescriptionEditBtn.replace('%DESCR%', descr)));
    }

    async getTokenDescriptionEditInput(descr){
        return await this.driver.findElement(By.xpath(tokenDescriptionEditInput));
    }

    async getTokenReviewTokenCode(){
        return await this.driver.findElement(By.css(tokenReviewTokenCode));
    }

    async getTokenReviewPermissions(){
        return await this.driver.findElement(By.css(tokenReviewPermissions));
    }

    async getTokenReviewPermissionItem(item){
        return await this.driver.findElement(By.xpath(tokenReviewPermissionItem.replace('%ITEM%', item)));
    }

    async getTokenCardDeleteButton(descr){
        return await this.driver.findElement(By.css(tokenCardDeleteButton.replace('%DESCR%', descr)));
    }

    async getTokenCardDeleteConfirm(descr){
        return await this.driver.findElement(By.css(tokenCardDeleteConfirm.replace('%DESCR%', descr)));
    }

    async getTokenCardPopoverDeletConfirm(){
        return await this.driver.findElement(By.xpath(tokenCardPopoverDeletConfirm));
    }
}

module.exports = tokensTab;
