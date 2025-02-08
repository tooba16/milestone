// Resume Form Submission
document.getElementById('resumeForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Form Elements
    const fields = [
        'profilePicture', 'name', 'email', 'phone', 'education', 'experience', 'skills', 'username'
    ].reduce((acc, id) => {
        acc[id] = document.getElementById(id) as HTMLInputElement;
        return acc;
    }, {} as Record<string, HTMLInputElement>);

    // Check if all fields are present
    if (Object.values(fields).some((field) => !field)) {
        console.error('One or more elements are missing');
        return;
    }

    // Extract values
    const { profilePicture, name, email, phone, education, experience, skills, username } = fields;
    const resumeData = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        education: education.value,
        experience: experience.value,
        skills: skills.value,
        profilePictureUrl: profilePicture.files?.[0] ? URL.createObjectURL(profilePicture.files[0]) : '',
        resumePath: `resumes/${username.value.replace(/\s+/g, '_')}_cv.html`
    };

    // Generate Resume HTML
    const resumeHTML = `
        <h2>Resume</h2>
        ${resumeData.profilePictureUrl ? `<img src="${resumeData.profilePictureUrl}" alt="Profile Picture" class="profilePicture">` : ""}
        <p><strong>Name:</strong> <span class="editable">${resumeData.name}</span></p>
        <p><strong>Email:</strong> <span class="editable">${resumeData.email}</span></p>
        <p><strong>Phone:</strong> <span class="editable">${resumeData.phone}</span></p>
        <h3>Education</h3><p class="editable">${resumeData.education}</p>
        <h3>Experience</h3><p class="editable">${resumeData.experience}</p>
        <h3>Skills</h3><p class="editable">${resumeData.skills}</p>
    `;

    // Create Download Link
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:text/html;charset=utf-8,${encodeURIComponent(resumeHTML)}`;
    downloadLink.download = resumeData.resumePath;
    downloadLink.textContent = 'Download Your 2024 Resume';

    const resumeOutput = document.getElementById('resumeOutput');
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeHTML;
        resumeOutput.appendChild(downloadLink);
        resumeOutput.classList.remove('hidden');

        // Buttons Container
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'buttonContainer';
        resumeOutput.appendChild(buttonContainer);

        // Share Link Button
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Copy Shareable Link';
        shareButton.addEventListener('click', async () => {
            try {
                const shareableLink = `https://yourdomain.com/resume/${username.value.replace(/\s+/g, "_")}_cv.html`;
                await navigator.clipboard.writeText(shareableLink);
                alert('Shareable link copied to clipboard');
            } catch (error) {
                console.error('Failed to copy link', error);
                alert('Failed to copy link to clipboard. Please try again.');
            }
        });
        buttonContainer.appendChild(shareButton);

        enableEditableFields();
    } else {
        console.error('Resume output container not found');
    }
});

// Function to Enable Editable Fields
function enableEditableFields() {
    document.querySelectorAll('.editable').forEach((element) => {
        element.addEventListener('click', () => {
            const textElement = element as HTMLElement;
            const initialValue = textElement.textContent || '';
            const input = document.createElement('input');
            input.type = 'text';
            input.value = initialValue;
            input.classList.add('editing-input');

            input.addEventListener('blur', () => {
                textElement.textContent = input.value;
                textElement.style.display = 'inline';
                input.remove();
            });

            textElement.style.display = 'none';
            textElement.parentNode?.insertBefore(input, textElement);
            input.focus();
        });
    });
}
