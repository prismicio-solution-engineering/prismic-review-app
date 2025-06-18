import "dotenv/config";
import * as prismic from "@prismicio/client";
import { repositoryName } from "@/slicemachine.config.json";

const cloneContent = async () => {
    // List of pages to clone from the original repo
    const pagesToUpdate = [
        {
            type: "reviews_checklist",
        },
        {
            type: "review_criteria_category",
            uid: "media-management",
        },
        {
            type: "review_criteria_category",
            uid: "cdn-endpoint",
        },
        {
            type: "review_criteria_category",
            uid: "typescript-implementation",
        },
        {
            type: "review_criteria_category",
            uid: "fields",
        },
        {
            type: "review_criteria_category",
            uid: "content-relationships",
        },
        {
            type: "review_criteria_category",
            uid: "slice-simulator",
        },
        {
            type: "review_criteria_category",
            uid: "routing",
        },
        {
            type: "review_criteria_category",
            uid: "page-preview",
        },
        {
            type: "review_criteria_category",
            uid: "templating",
        },
        {
            type: "review_criteria_category",
            uid: "queries",
        },
        {
            type: "review_criteria_category",
            uid: "types",
        },
        {
            type: "review_criteria_category",
            uid: "slices",
        },
    ];

    // Prismic setup
    const writeClient = prismic.createWriteClient(repositoryName, {
        writeToken: process.env.PRISMIC_WRITE_TOKEN,
    });

    const migration = prismic.createMigration();

    // Original repo
    const otherClient = prismic.createClient("prismic-partners-web");


    // Use for...of loop instead of forEach to handle async operations properly
    for (const page of pagesToUpdate) {
        try {
            // Fetch document
            console.log("FETCHING PAGE", page);
            const documentFromTemplate = page.uid
                ? await otherClient.getByUID(page.type, page.uid)
                : await otherClient.getSingle(page.type);

            // Add document to the migration
            const document = migration.createDocumentFromPrismic(documentFromTemplate, `${documentFromTemplate.uid ? documentFromTemplate.uid : documentFromTemplate.type}`);
        } catch (error) {
            console.error(`Error fetching page ${page.type} ${page.uid || '(single)'}:`, error);
            // Continue with other pages even if one fails
        }
    }

    // Execute the prepared migration at the very end of the script
    try {
        await writeClient.migrate(migration, {
            reporter: (event) => console.log(event),
        });
        console.log("Migration completed successfully!");
    } catch (error) {
        console.error("Migration failed:", error);
    }
};

cloneContent();