# Shield Prompt

Shield Prompt is a free and open-source Google Chrome extension that provides an extra layer of protection against inadvertently sharing confidential information like emails, API keys, and PII (personally identifiable information) in ChatGPT prompts. 

The extension uses a combination of regex and the validator library to scan ChatGPT prompts for potentially confidential information. If any confidential information is found, it is masked in the prompt to prevent accidental sharing.

Additionally, Shield Prompt also tracks the estimated tokens and words in the prompt to give users an idea of the length and complexity of their prompts. This can be especially useful for users who are limited by word or token counts in their applications.

Shield Prompt is completely client-side and does not send any data to a remote server, ensuring that your data remains private and secure. 

## Installation

To install Shield Prompt, simply visit the Chrome Web Store and search for Shield Prompt. Click on the "Add to Chrome" button, and the extension will be installed and ready to use.

## Usage

Once installed, run `yarn build` and the extension will be bundled into the dist folder with webpack. After bundling the project, follow this documentation[https://support.google.com/chrome/a/answer/2714278?hl=en#:~:text=Go%20to%20chrome%3A%2F%2Fextensions,the%20app%20or%20extension%20folder.] to add the extension to your Chrome browser.

Shield Prompt will also display the estimated tokens and words in the prompt. This information can be useful for users who are working within strict word or token limits.

## Contributions

Shield Prompt is an open-source project, and contributions are always welcome. If you would like to contribute to the project, please see our GitHub repository for more information. 

## License

Shield Prompt is released under the MIT license. See the LICENSE file for more information.
