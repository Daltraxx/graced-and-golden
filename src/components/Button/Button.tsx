import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import buttonStyles from "@/components/Button/styles.module.css";

type ButtonProps = PrismicNextLinkProps & {
  color?:
    | "cream-200"
    | "brown-200"
    | "brown-300"
    | "brown-500"
    | "brown-700"
    | "brown-800"
    | "beige-300"
    | "olive-brown-700";
};

/**
 * Renders a styled link button using `PrismicNextLink`.
 *
 * Applies a base button class and conditionally appends a color-specific style
 * class based on the `color` prop. If no color is provided, `"brown-200"` is used.
 *
 * @param props - Component props.
 * @param props.className - Optional additional CSS class names to append.
 * @param props.color - Visual theme token for the button style.
 * Supported values: `"cream-200"`, `"brown-200"`, `"brown-300"`, `"brown-500"`,
 * `"brown-700"`, `"brown-800"`, `"beige-300"`, `"olive-brown-700"`.
 * @param props.restProps - Remaining props forwarded to `PrismicNextLink`.
 * @returns A `PrismicNextLink` element styled as a button.
 */
export default function Button({
  className,
  color = "brown-200",
  ...restProps
}: ButtonProps) {
  return (
    <PrismicNextLink
      className={clsx(
        buttonStyles.button,
        color === "cream-200" && buttonStyles.buttonCream200,
        color === "brown-200" && buttonStyles.buttonBrown200,
        color === "brown-300" && buttonStyles.buttonBrown300,
        color === "brown-500" && buttonStyles.buttonBrown500,
        color === "brown-700" && buttonStyles.buttonBrown700,
        color === "brown-800" && buttonStyles.buttonBrown800,
        color === "beige-300" && buttonStyles.buttonBeige300,
        color === "olive-brown-700" && buttonStyles.buttonOliveBrown700,
        className,
      )}
      {...restProps}
    />
  );
}

type NonPrismicButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?:
    | "cream-200"
    | "brown-200"
    | "brown-300"
    | "brown-500"
    | "brown-700"
    | "brown-800"
    | "beige-300"
    | "olive-brown-700";
};

/**
 * A simple button component with customizable color variants.
 *
 * @component
 * @param {NonPrismicButtonProps} props - The button properties
 * @param {string} [props.className] - Additional CSS class names to apply to the button
 * @param {string} [props.color="brown-200"] - The color variant of the button. Supported values are:
 *   - "cream-200"
 *   - "brown-200" (default)
 *   - "brown-300"
 *   - "brown-500"
 *   - "brown-700"
 *   - "brown-800"
 *   - "beige-300"
 *   - "olive-brown-700"
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [props...restProps] - Standard HTML button attributes
 *
 * @returns {React.ReactElement} A styled button element with the specified color variant and any additional classes applied
 *
 * @example
 * // Default brown-200 button
 * <NonPrismicButton>Click me</NonPrismicButton>
 *
 * @example
 * // Cream-colored button with custom class
 * <NonPrismicButton color="cream-200" className="custom-class">
 *   Submit
 * </NonPrismicButton>
 */
export function NonPrismicButton({
  className,
  color = "brown-200",
  type = "button",
  ...restProps
}: NonPrismicButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        buttonStyles.button,
        color === "cream-200" && buttonStyles.buttonCream200,
        color === "brown-200" && buttonStyles.buttonBrown200,
        color === "brown-300" && buttonStyles.buttonBrown300,
        color === "brown-500" && buttonStyles.buttonBrown500,
        color === "brown-700" && buttonStyles.buttonBrown700,
        color === "brown-800" && buttonStyles.buttonBrown800,
        color === "beige-300" && buttonStyles.buttonBeige300,
        color === "olive-brown-700" && buttonStyles.buttonOliveBrown700,
        className,
      )}
      {...restProps}
    />
  );
}
