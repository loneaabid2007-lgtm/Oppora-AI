function startFinding() {

    document.getElementById("finder").scrollIntoView({
        behavior: "smooth"
    });

}

function scrollToHow() {
    document.getElementById("how-it-works").scrollIntoView({
        behavior: "smooth"
    });
}
/* OPPORTUNITY DATA */

const opportunities = [

    {
        title: "National Student Innovation Challenge",
        provider: "Student Innovation Network",
        type: "Competitions",
        skills: ["technology", "coding", "innovation", "ai"],
        interests: ["technology", "ai", "innovation"],
        education: ["Class 12", "Undergraduate"],
        location: "India",
        description:
            "A student-focused challenge for building innovative technology solutions.",
        deadline: "Open",
        mode: "Online"
    },

    {
        title: "Future Skills Internship Program",
        provider: "Future Skills Network",
        type: "Internships",
        skills: ["technology", "coding", "web development", "writing"],
        interests: ["technology", "business", "education"],
        education: ["Class 12", "Diploma", "Undergraduate"],
        location: "India",
        description:
            "A learning-focused internship opportunity for students developing practical skills.",
        deadline: "Open",
        mode: "Remote"
    },

    {
        title: "Student Excellence Scholarship",
        provider: "Education Opportunity Foundation",
        type: "Scholarships",
        skills: ["academic"],
        interests: ["education"],
        education: ["Class 12", "Undergraduate", "Postgraduate"],
        location: "India",
        description:
            "Financial support opportunity for students pursuing further education.",
        deadline: "Open",
        mode: "Online"
    },

    {
        title: "AI Builders Hackathon",
        provider: "AI Developer Community",
        type: "Hackathons",
        skills: ["coding", "javascript", "python", "ai", "technology"],
        interests: ["ai", "technology", "coding"],
        education: ["Class 12", "Diploma", "Undergraduate", "Postgraduate"],
        location: "India",
        description:
            "Build an AI-powered solution and demonstrate it to a developer community.",
        deadline: "Open",
        mode: "Online"
    },

    {
        title: "Young Creator Fellowship",
        provider: "Creator Development Network",
        type: "Fellowships",
        skills: ["writing", "design", "video", "communication"],
        interests: ["content", "media", "design", "business"],
        education: ["Class 12", "Undergraduate", "Postgraduate"],
        location: "India",
        description:
            "A fellowship for students and young creators building meaningful projects.",
        deadline: "Open",
        mode: "Remote"
    }

];
function findMatchingOpportunities(profile) {

    const userSkills = profile.skills
        .toLowerCase()
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

    const userInterests = profile.interests
        .toLowerCase()
        .split(",")
        .map(item => item.trim())
        .filter(Boolean);

    return opportunities.map(opportunity => {

        let score = 0;
        let reasons = [];

        /* Education match */

        if (opportunity.education.includes(profile.education)) {
            score += 30;
            reasons.push("Your education level matches");
        }


        /* Opportunity type */

        if (
            profile.opportunityType === "All" ||
            profile.opportunityType === opportunity.type
        ) {
            score += 25;
            reasons.push("Matches your preferred opportunity type");
        }


        /* Skills */

        const matchedSkills = userSkills.filter(skill =>
            opportunity.skills.includes(skill)
        );

        if (matchedSkills.length > 0) {
            score += Math.min(matchedSkills.length * 10, 25);

            reasons.push(
                "Your skills match: " +
                matchedSkills.join(", ")
            );
        }


        /* Interests */

        const matchedInterests = userInterests.filter(interest =>
            opportunity.interests.includes(interest)
        );

        if (matchedInterests.length > 0) {
            score += Math.min(matchedInterests.length * 10, 20);

            reasons.push(
                "Your interests match: " +
                matchedInterests.join(", ")
            );
        }


        return {
            ...opportunity,
            score: Math.min(score, 100),
            reasons: reasons
        };

    })
    .filter(opportunity => opportunity.score > 20)
    .sort((a, b) => b.score - a.score);
}
function analyzeProfile() {

    const education =
        document.getElementById("education").value;

    const location =
        document.getElementById("location").value.trim();

    const skills =
        document.getElementById("skills").value.trim();

    const interests =
        document.getElementById("interests").value.trim();

    const opportunityType =
        document.getElementById("opportunityType").value;

    const message =
        document.getElementById("formMessage");


    if (
        !education ||
        !location ||
        !skills ||
        !interests ||
        !opportunityType
    ) {

        message.style.display = "block";

        message.textContent =
            "Please complete all fields before continuing.";

        return;
    }


    const profile = {
        education,
        location,
        skills,
        interests,
        opportunityType
    };


    localStorage.setItem(
        "opporaProfile",
        JSON.stringify(profile)
    );


    const matchedOpportunities =
        findMatchingOpportunities(profile);


    displayOpportunities(matchedOpportunities);


    message.style.display = "block";

    message.textContent =
        `${matchedOpportunities.length} opportunities matched your profile.`;


    document.getElementById("results").scrollIntoView({
        behavior: "smooth"
    });
}
function displayOpportunities(results) {

    const container =
        document.getElementById("opportunityList");


    if (results.length === 0) {

        container.innerHTML = `
            <div class="empty-results">
                <h3>No strong matches found</h3>
                <p>
                    Try adding more skills or interests
                    to improve your results.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML = results.map(opportunity => {

        const reasons =
            opportunity.reasons.length > 0
                ? opportunity.reasons.join(" • ")
                : "Based on your profile";


        return `
            <article class="opportunity-card">

                <div class="opportunity-top">

                    <span class="opportunity-type">
                        ${opportunity.type}
                    </span>

                    <span class="match-score">
                        ${opportunity.score}% Match
                    </span>

                </div>


                <h3>
                    ${opportunity.title}
                </h3>


                <p class="opportunity-provider">
                    ${opportunity.provider}
                </p>


                <p class="opportunity-description">
                    ${opportunity.description}
                </p>


                <div class="opportunity-meta">

                    <span class="meta-item">
                        ${opportunity.mode}
                    </span>

                    <span class="meta-item">
                        ${opportunity.location}
                    </span>

                    <span class="meta-item">
                        Deadline: ${opportunity.deadline}
                    </span>

                </div>


                <div class="why-match">

                    <strong>
                        Why Oppora matched this
                    </strong>

                    <span>
                        ${reasons}
                    </span>

                </div>


                <button
                    class="opportunity-btn"
                    onclick="viewOpportunity('${opportunity.title}')"
                >
                    View Opportunity
                </button>

            </article>
        `;

    }).join("");
}
function viewOpportunity(title) {

    alert(
        "Opportunity details for:\n\n" +
        title +
        "\n\nDetailed eligibility and application plan will be generated by Oppora AI in the next steps."
    );

}
function runOpporaAgent() {

    const profile =
        JSON.parse(
            localStorage.getItem("opporaProfile")
        );


    if (!profile) {

        alert(
            "Please complete your student profile first."
        );

        document.getElementById("finder").scrollIntoView({
            behavior: "smooth"
        });

        return;
    }


    const button =
        document.querySelector(".run-agent-btn");

    const status =
        document.getElementById("agentStatus");

    const output =
        document.getElementById("agentOutput");


    button.disabled = true;

    button.textContent = "Agent is working...";

    output.style.display = "none";


    const steps = [
        "agentStep1",
        "agentStep2",
        "agentStep3",
        "agentStep4",
        "agentStep5"
    ];


    let currentStep = 0;


    function processStep() {

        if (currentStep > 0) {

            const previous =
                document.getElementById(
                    steps[currentStep - 1]
                );

            previous.classList.remove("active");

            previous.classList.add("completed");

            previous.querySelector(".agent-check").textContent = "✓";
        }


        if (currentStep < steps.length) {

            const current =
                document.getElementById(
                    steps[currentStep]
                );

            current.classList.add("active");

            current.querySelector(".agent-check").textContent = "●";


            const titles = [
                "Analyzing your student profile...",
                "Researching relevant opportunities...",
                "Checking opportunity eligibility...",
                "Explaining why opportunities match...",
                "Creating your application action plan..."
            ];

            status.textContent =
                titles[currentStep];

            currentStep++;

            setTimeout(processStep, 900);

            return;
        }


        finishAgent();
    }


    async function finishAgent() {

    status.textContent =
        "Oppora AI is generating your personalized analysis...";


    const matches =
        findMatchingOpportunities(profile);


    const topMatches =
        matches.slice(0, 5);


    try {

        const response = await fetch("/api/agent", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                education: profile.education,

                location: profile.location,

                skills: profile.skills,

                interests: profile.interests,

                opportunityType:
                    profile.opportunityType,

                opportunities:
                    topMatches

            })

        });


        const data =
            await response.json();


        if (!response.ok) {
            throw new Error(
                data.error ||
                "AI request failed"
            );
        }


        status.textContent =
            "AI analysis completed successfully.";


        button.disabled = false;

        button.textContent =
            "Run Oppora AI Agent Again";


        output.style.display = "block";


        output.innerHTML = `

            <h3>
                Oppora AI Analysis
            </h3>

            <div class="ai-result">
                ${formatAIResponse(data.result)}
            </div>

        `;


    } catch (error) {

        console.error(error);


        status.textContent =
            "AI analysis could not be completed.";


        button.disabled = false;

        button.textContent =
            "Try Again";


        output.style.display = "block";


        output.innerHTML = `

            <h3>
                AI Connection Error
            </h3>

            <p>
                ${error.message}
            </p>

            <p>
                Make sure the project is deployed on
                Vercel and the OPENAI_API_KEY is configured.
            </p>

        `;

    }

}

    processStep();

}
function formatAIResponse(text) {

    return text
        .replace(
            /PROFILE ANALYSIS/g,
            "<h4>Profile Analysis</h4>"
        )

        .replace(
            /TOP MATCHES/g,
            "<h4>Top Matches</h4>"
        )

        .replace(
            /ELIGIBILITY/g,
            "<h4>Eligibility</h4>"
        )

        .replace(
            /WHY THESE MATCH/g,
            "<h4>Why These Match</h4>"
        )

        .replace(
            /APPLICATION ACTION PLAN/g,
            "<h4>Application Action Plan</h4>"
        )

        .replace(
            /NEXT STEPS/g,
            "<h4>Next Steps</h4>"
        )

        .replace(/\n/g, "<br>");
}