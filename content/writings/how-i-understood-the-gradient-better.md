---
title: "How I understood the Gradient better"
date: 2024-06-15T00:00:00+0530
description: "Teaching myself why the vector of partial derivatives represents the gradient."
tags: ["Math", "Substack"]
status: "finished"
confidence: "possible"
released: true
draft: false
---

One of the biggest misconceptions I've had in math is that the gradient points in the direction of steepest ascent because of the way it is defined as the vector of partial derivatives.

This created a few interesting questions that I couldn't answer:

1. The partials measure rates of change along specified directions—which can be decided arbitrarily—and yet the gradient remains invariant to this choice. Why?

2. If I change my reference PoV, the coordinates of the gradient change, but not the length, nor the functional form. Why?

Math stack exchange suggests looking at directional derivatives.[1]

Directional derivative is defined as:

{{< math >}}
$$\nabla f(a) \cdot \mathbf{v} = |\nabla f(a)||\mathbf{v}| \cos(\theta)$$
{{< /math >}}

and measures the rate of change along any arbitrary vector v.
The argument is that since this is a dot product with the gradient, this will be maximised only when the v is along the support of the gradient.

This explanation is correct, but not very intuitive and it is easy to see why: The directional derivative is defined using the gradient.
It measures the magnitude of any vector using the dot product of that vector with the gradient. This will only be maximised when the vector along the support of the gradient.

Without further information, this reasoning can be circular. You can arbitrarily replace the gradient with any vector and the reasoning would still hold. In other words, this reasoning explains the uniqueness of the vector of maximal change, but not why the vector of partials is this vector.

### The missing link

The key insight for me here was the succinct nature of the directional derivative argument. It makes no use of partial derivatives at all!

I made an implicit assumption that it was the nature of the gradient as the vector of partial derivatives that made it point in the direction of steepest ascent, but this is not always true.
One needs to look no further than the same gradient expressed in polar coordinates:

{{< math >}}
$$\nabla f = \left(\frac{\partial f}{\partial r}, \frac{1}{r}\frac{\partial f}{\partial \theta}\right)$$
{{< /math >}}

where, r is the radius and theta is the angle. The gradient with respect to theta needs to account for the radius at that point!

And this gives us the missing link: The coordinate system!

The gradient is always pointed in the direction of steepest ascent; It is only in certain cases that it takes the form of the vector of partial derivatives.

This changes the problem from a "why" to a "when".
When can the gradient be expressed as a vector of partial derivatives? What are the properties of such a coordinate system?

Let's build this from scratch:

What properties must our coordinate system have so that the following hold true:

1. The Gradient should be expressed as the vector of partial derivatives.

2. This choice of partial derivatives should be invariant to the direction in which we take the partials.

3. Lengths should preserved if when we change our reference PoV.


These requirement give us the required restrictions for our coordinate system:

1. The measurement of vectors should be independent of the location of measurement.
This is important because if this were not the case, we could not represent the gradient using just the partials. We would need to account for where in the space the gradient is calculated.
This also means that our coordinate system should have homogenous discretisation of space, ie, the lengths and size measurements should be independent of location. This rules out systems like the polar coordinates.

2. For the gradient to just have one single partial derivative per index, the basis vectors of the coordinate system should be orthogonal.
If this were not the case, we would need to take into account the alignment of other basis vectors along any particular direction and include components of their rates of change.
In other words, the total rate of change along a particular direction should be independent of the rates of changes calculated along other directions.
This is a natural consequence of the Pythagorean Theorem.

3. For lengths to be preserved, there should be radial symmetry in the ways we transform our PoV. In other words, we are restricted to change of basis that are simple rotations without scaling.[2]


So, a homogenous discretisation of space with orthogonal basis vectors, where the change of basis is restricted by preservation of both, the lengths of vectors and the orthogonality of the basis?
We've just described a Euclidean coordinate system with orthogonal basis vectors. In fact considering that dimensions to be equally sized, we have just described the Standard Euclidean Coordinate System!

The gradient is the vector of maximal change, and when working with a standard euclidean system, this vector can be simply expressed as the vector of partial derivatives along the basis vectors.

To get a true general definition of the gradient in any coordinate system, we have to include the way the coordinates interact with each other and the local properties of space.

### The Conclusion
How we measure the domain has to be taken into account while reasoning about anything we measure. Sounds obvious in retrospect, but given the ubiquitousness of the Euclidean System in science and engineering, it is easy to see why one may consider it to be a given; even consider its properties universal.

### Footnotes and References
[1] [AsinglePANCAKE](https://math.stackexchange.com/users/12537/asinglepancake), Why is gradient the direction of steepest ascent?, URL (version: 2017-12-24): https://math.stackexchange.com/q/223261

[2] For a better understanding of how vector transformations work, and how the coordinates change in the specific well defined rules that keep the vector invariant, checkout this awesome series on tensors by [eigenchris](https://www.youtube.com/@eigenchris) on youtube!


<div style="font-style: italic; color: #888888;">(Ported from an earlier Substack <a href="https://raahulsingh.substack.com/p/how-i-understood-the-gradient-better">post</a>)</div>