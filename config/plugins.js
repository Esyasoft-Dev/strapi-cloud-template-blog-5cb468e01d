module.exports = ({ env }) => ({
    //   upload: {
    //     config: {
    //       provider: "aws-s3",
    //       providerOptions: {
    //         s3Options: {
    //           credentials: {
    //             accessKeyId: env("R2_ACCESS_KEY_ID"),
    //             secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    //           },
    //           region: "auto",
    //           endpoint: env("R2_ENDPOINT"), // e.g. https://<ACCOUNT_ID>.r2.cloudflarestorage.com
    //         },
    //         params: {
    //           Bucket: env("R2_BUCKET"),
    //         },
    //         baseUrl: env("R2_PUBLIC_URL"),
    //         rootPath: env("R2_ROOT_PATH", ""), // e.g. 'my-prefix' (adds a prefix to all uploads)
    //       },
    //       actionOptions: {
    //         upload: {},
    //         uploadStream: {},
    //         delete: {},
    //       },
    //     },
    //   },
    seo: {
        enabled: true,
    },
});
