var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
var _this = this;
// Resume Form Submission
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Form Elements
    var fields = [
        'profilePicture', 'name', 'email', 'phone', 'education', 'experience', 'skills', 'username'
    ].reduce(function (acc, id) {
        acc[id] = document.getElementById(id);
        return acc;
    }, {});
    // Check if all fields are present
    if (Object.values(fields).some(function (field) { return !field; })) {
        console.error('One or more elements are missing');
        return;
    }
    // Extract values
    var profilePicture = fields.profilePicture, name = fields.name, email = fields.email, phone = fields.phone, education = fields.education, experience = fields.experience, skills = fields.skills, username = fields.username;
    var resumeData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        education: education.value,
        experience: experience.value,
        skills: skills.value,
        profilePictureUrl: ((_a = profilePicture.files) === null || _a === void 0 ? void 0 : _a[0]) ? URL.createObjectURL(profilePicture.files[0]) : '',
        resumePath: "resumes/".concat(username.value.replace(/\s+/g, '_'), "_cv.html")
    };
    // Generate Resume HTML
    var resumeHTML = "\n        <h2>Resume</h2>\n        ".concat(resumeData.profilePictureUrl ? "<img src=\"".concat(resumeData.profilePictureUrl, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : "", "\n        <p><strong>Name:</strong> <span class=\"editable\">").concat(resumeData.name, "</span></p>\n        <p><strong>Email:</strong> <span class=\"editable\">").concat(resumeData.email, "</span></p>\n        <p><strong>Phone:</strong> <span class=\"editable\">").concat(resumeData.phone, "</span></p>\n        <h3>Education</h3><p class=\"editable\">").concat(resumeData.education, "</p>\n        <h3>Experience</h3><p class=\"editable\">").concat(resumeData.experience, "</p>\n        <h3>Skills</h3><p class=\"editable\">").concat(resumeData.skills, "</p>\n    ");
    // Create Download Link
    var downloadLink = document.createElement('a');
    downloadLink.href = "data:text/html;charset=utf-8,".concat(encodeURIComponent(resumeHTML));
    downloadLink.download = resumeData.resumePath;
    downloadLink.textContent = 'Download Your 2024 Resume';
    var resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeHTML;
        resumeOutput.appendChild(downloadLink);
        resumeOutput.classList.remove('hidden');
        // Buttons Container
        var buttonContainer = document.createElement('div');
        buttonContainer.id = 'buttonContainer';
        resumeOutput.appendChild(buttonContainer);
        // Share Link Button
        var shareButton = document.createElement('button');
        shareButton.textContent = 'Copy Shareable Link';
        shareButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var shareableLink, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        shareableLink = "https://yourdomain.com/resume/".concat(username.value.replace(/\s+/g, "_"), "_cv.html");
                        return [4 /*yield*/, navigator.clipboard.writeText(shareableLink)];
                    case 1:
                        _a.sent();
                        alert('Shareable link copied to clipboard');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Failed to copy link', error_1);
                        alert('Failed to copy link to clipboard. Please try again.');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        buttonContainer.appendChild(shareButton);
        enableEditableFields();
    }
    else {
        console.error('Resume output container not found');
    }
});
// Function to Enable Editable Fields
function enableEditableFields() {
    document.querySelectorAll('.editable').forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var textElement = element;
            var initialValue = textElement.textContent || '';
            var input = document.createElement('input');
            input.type = 'text';
            input.value = initialValue;
            input.classList.add('editing-input');
            input.addEventListener('blur', function () {
                textElement.textContent = input.value;
                textElement.style.display = 'inline';
                input.remove();
            });
            textElement.style.display = 'none';
            (_a = textElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, textElement);
            input.focus();
        });
    });
}
