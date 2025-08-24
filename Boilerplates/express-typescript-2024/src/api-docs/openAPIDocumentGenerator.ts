import { healthCheckRegistry } from "@/routes/healthCheck/healthCheckRouter";
import { userRegistry } from "@/routes/user/userRouter";
import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API",
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json",
    },
  });
}
