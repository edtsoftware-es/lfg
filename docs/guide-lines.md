-Leverage Design System Components: Always prioritize using existing design system components instead of creating unnecessary new ones or using HTML primitives when more appropriate components already exist.

-Use TypeScript Judiciously: Avoid excessive type annotations when types are already being inferred correctly. Don't explicitly type function returns, variables, or other elements when TypeScript can correctly infer them.

-Component Organization: When extracting logic to improve code organization through child components, if the child component is only used by the parent, keep it in the same file rather than creating additional files.

-Server Components First: Utilize server components whenever possible, especially for data fetching operations. Pass necessary data to client components via props when client-side functionality is required.

-Use Tailwind Configuration Variables: Always use the configured Tailwind variables instead of hardcoding style values (e.g., use text-sm instead of text-[14px]).

-Form Handling Best Practices: Implement useActionState for form management and use Zod schemas for validation.
